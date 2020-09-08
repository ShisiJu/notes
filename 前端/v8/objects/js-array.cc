// Copyright 2019 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

extern enum IterationKind extends uint31
constexpr 'IterationKind' { kKeys, kValues, kEntries }

extern class JSArrayIterator extends JSObject {
  iterated_object: JSReceiver;
  next_index: Number;
  kind: SmiTagged<IterationKind>;
}

// Perform CreateArrayIterator (ES #sec-createarrayiterator).
@export
macro CreateArrayIterator(implicit context: NativeContext)(
    array: JSReceiver, kind: constexpr IterationKind): JSArrayIterator {
  return new JSArrayIterator{
    map: *NativeContextSlot(ContextSlot::INITIAL_ARRAY_ITERATOR_MAP_INDEX),
    properties_or_hash: kEmptyFixedArray,
    elements: kEmptyFixedArray,
    iterated_object: array,
    next_index: 0,
    kind: SmiTag<IterationKind>(kind)
  };
}

extern class JSArray extends JSObject {
  macro IsEmpty(): bool {
    return this.length == 0;
  }
  length: Number;
}

macro NewJSArray(implicit context: Context)(
    map: Map, elements: FixedArrayBase): JSArray {
  return new JSArray{
    map,
    properties_or_hash: kEmptyFixedArray,
    elements,
    length: elements.length
  };
}

macro NewJSArray(implicit context: Context)(): JSArray {
  return new JSArray{
    map: GetFastPackedSmiElementsJSArrayMap(),
    properties_or_hash: kEmptyFixedArray,
    elements: kEmptyFixedArray,
    length: 0
  };
}

// A HeapObject with a JSArray map, and either fast packed elements, or fast
// holey elements when the global NoElementsProtector is not invalidated.
transient type FastJSArray extends JSArray;

// A HeapObject with a JSArray map, and either fast packed elements, or fast
// holey elements or frozen, sealed elements when the global NoElementsProtector
// is not invalidated.
transient type FastJSArrayForRead extends JSArray;

// A FastJSArray when the global ArraySpeciesProtector is not invalidated.
transient type FastJSArrayForCopy extends FastJSArray;

// A FastJSArray when the global ArrayIteratorProtector is not invalidated.
transient type FastJSArrayWithNoCustomIteration extends FastJSArray;

// A FastJSArrayForRead when the global ArrayIteratorProtector is not
// invalidated.
transient type FastJSArrayForReadWithNoCustomIteration extends
    FastJSArrayForRead;

extern macro AllocateJSArray(
    constexpr ElementsKind, Map, intptr, Smi,
    constexpr AllocationFlag): JSArray;
extern macro AllocateJSArray(constexpr ElementsKind, Map, intptr, Smi): JSArray;
extern macro AllocateJSArray(constexpr ElementsKind, Map, Smi, Smi): JSArray;
extern macro AllocateJSArray(Map, FixedArrayBase, Smi): JSArray;

macro LoadElementNoHole<T : type extends FixedArrayBase>(
    a: JSArray, index: Smi): JSAny
    labels IfHole;

LoadElementNoHole<FixedArray>(implicit context: Context)(
    a: JSArray, index: Smi): JSAny
    labels IfHole {
  const elements: FixedArray =
      Cast<FixedArray>(a.elements) otherwise unreachable;
  const e = UnsafeCast<(JSAny | TheHole)>(elements.objects[index]);
  typeswitch (e) {
    case (TheHole): {
      goto IfHole;
    }
    case (e: JSAny): {
      return e;
    }
  }
}

LoadElementNoHole<FixedDoubleArray>(implicit context: Context)(
    a: JSArray, index: Smi): JSAny
    labels IfHole {
  const elements: FixedDoubleArray =
      Cast<FixedDoubleArray>(a.elements) otherwise unreachable;
  const e: float64 = elements.floats[index].Value() otherwise IfHole;
  return AllocateHeapNumberWithValue(e);
}

extern builtin ExtractFastJSArray(Context, JSArray, Smi, Smi): JSArray;

extern macro MoveElements(
    constexpr ElementsKind, FixedArrayBase, intptr, intptr, intptr): void;
macro TorqueMoveElementsSmi(
    elements: FixedArray, dstIndex: intptr, srcIndex: intptr,
    count: intptr): void {
  MoveElements(
      ElementsKind::HOLEY_SMI_ELEMENTS, elements, dstIndex, srcIndex, count);
}
macro TorqueMoveElements(
    elements: FixedArray, dstIndex: intptr, srcIndex: intptr,
    count: intptr): void {
  MoveElements(
      ElementsKind::HOLEY_ELEMENTS, elements, dstIndex, srcIndex, count);
}
macro TorqueMoveElements(
    elements: FixedDoubleArray, dstIndex: intptr, srcIndex: intptr,
    count: intptr): void {
  MoveElements(
      ElementsKind::HOLEY_DOUBLE_ELEMENTS, elements, dstIndex, srcIndex, count);
}

extern macro CopyElements(
    constexpr ElementsKind, FixedArrayBase, intptr, FixedArrayBase, intptr,
    intptr): void;
macro TorqueCopyElements(
    dstElements: FixedArray, dstIndex: intptr, srcElements: FixedArray,
    srcIndex: intptr, count: intptr): void {
  CopyElements(
      ElementsKind::HOLEY_ELEMENTS, dstElements, dstIndex, srcElements,
      srcIndex, count);
}
macro TorqueCopyElements(
    dstElements: FixedDoubleArray, dstIndex: intptr,
    srcElements: FixedDoubleArray, srcIndex: intptr, count: intptr): void {
  CopyElements(
      ElementsKind::HOLEY_DOUBLE_ELEMENTS, dstElements, dstIndex, srcElements,
      srcIndex, count);
}

extern builtin CloneFastJSArray(Context, FastJSArrayForCopy): JSArray;

struct FastJSArrayWitness {
  macro Get(): FastJSArray {
    return this.unstable;
  }

  macro Recheck() labels CastError {
    if (this.stable.map != this.map) goto CastError;
    // We don't need to check elements kind or whether the prototype
    // has changed away from the default JSArray prototype, because
    // if the map remains the same then those properties hold.
    //
    // However, we have to make sure there are no elements in the
    // prototype chain.
    if (IsNoElementsProtectorCellInvalid()) goto CastError;
    this.unstable = %RawDownCast<FastJSArray>(this.stable);
  }

  macro LoadElementNoHole(implicit context: Context)(k: Smi): JSAny
      labels FoundHole {
    if (this.hasDoubles) {
      return LoadElementNoHole<FixedDoubleArray>(this.unstable, k)
          otherwise FoundHole;
    } else {
      return LoadElementNoHole<FixedArray>(this.unstable, k)
          otherwise FoundHole;
    }
  }

  macro StoreHole(k: Smi) {
    if (this.hasDoubles) {
      const elements = Cast<FixedDoubleArray>(this.unstable.elements)
          otherwise unreachable;
      elements.floats[k] = kDoubleHole;
    } else {
      const elements = Cast<FixedArray>(this.unstable.elements)
          otherwise unreachable;
      elements.objects[k] = TheHole;
    }
  }

  macro LoadElementOrUndefined(implicit context: Context)(k: Smi): JSAny {
    try {
      return this.LoadElementNoHole(k) otherwise FoundHole;
    } label FoundHole {
      return Undefined;
    }
  }

  macro EnsureArrayPushable(implicit context: Context)() labels Failed {
    EnsureArrayPushable(this.map) otherwise Failed;
    array::EnsureWriteableFastElements(this.unstable);
    this.arrayIsPushable = true;
  }

  macro ChangeLength(newLength: Smi) {
    assert(this.arrayIsPushable);
    this.unstable.length = newLength;
  }

  macro Push(value: JSAny) labels Failed {
    assert(this.arrayIsPushable);
    if (this.hasDoubles) {
      BuildAppendJSArray(
          ElementsKind::HOLEY_DOUBLE_ELEMENTS, this.unstable, value)
          otherwise Failed;
    } else if (this.hasSmis) {
      BuildAppendJSArray(ElementsKind::HOLEY_SMI_ELEMENTS, this.unstable, value)
          otherwise Failed;
    } else {
      assert(
          this.map.elements_kind == ElementsKind::HOLEY_ELEMENTS ||
          this.map.elements_kind == ElementsKind::PACKED_ELEMENTS);
      BuildAppendJSArray(ElementsKind::HOLEY_ELEMENTS, this.unstable, value)
          otherwise Failed;
    }
  }

  macro MoveElements(dst: intptr, src: intptr, length: intptr) {
    assert(this.arrayIsPushable);
    if (this.hasDoubles) {
      const elements: FixedDoubleArray =
          Cast<FixedDoubleArray>(this.unstable.elements)
          otherwise unreachable;
      TorqueMoveElements(elements, dst, src, length);
    } else {
      const elements: FixedArray = Cast<FixedArray>(this.unstable.elements)
          otherwise unreachable;
      if (this.hasSmis) {
        TorqueMoveElementsSmi(elements, dst, src, length);
      } else {
        TorqueMoveElements(elements, dst, src, length);
      }
    }
  }

  const stable: JSArray;
  unstable: FastJSArray;
  const map: Map;
  const hasDoubles: bool;
  const hasSmis: bool;
  arrayIsPushable: bool;
}

macro NewFastJSArrayWitness(array: FastJSArray): FastJSArrayWitness {
  const kind = array.map.elements_kind;
  return FastJSArrayWitness{
    stable: array,
    unstable: array,
    map: array.map,
    hasDoubles: IsDoubleElementsKind(kind),
    hasSmis:
        IsElementsKindLessThanOrEqual(kind, ElementsKind::HOLEY_SMI_ELEMENTS),
    arrayIsPushable: false
  };
}

struct FastJSArrayForReadWitness {
  macro Get(): FastJSArrayForRead {
    return this.unstable;
  }

  macro Recheck() labels CastError {
    if (this.stable.map != this.map) goto CastError;
    // We don't need to check elements kind or whether the prototype
    // has changed away from the default JSArray prototype, because
    // if the map remains the same then those properties hold.
    //
    // However, we have to make sure there are no elements in the
    // prototype chain.
    if (IsNoElementsProtectorCellInvalid()) goto CastError;
    this.unstable = %RawDownCast<FastJSArrayForRead>(this.stable);
  }

  macro LoadElementNoHole(implicit context: Context)(k: Smi): JSAny
      labels FoundHole {
    if (this.hasDoubles) {
      return LoadElementNoHole<FixedDoubleArray>(this.unstable, k)
          otherwise FoundHole;
    } else {
      return LoadElementNoHole<FixedArray>(this.unstable, k)
          otherwise FoundHole;
    }
  }

  const stable: JSArray;
  unstable: FastJSArrayForRead;
  const map: Map;
  const hasDoubles: bool;
}

macro NewFastJSArrayForReadWitness(array: FastJSArrayForRead):
    FastJSArrayForReadWitness {
  const kind = array.map.elements_kind;
  return FastJSArrayForReadWitness{
    stable: array,
    unstable: array,
    map: array.map,
    hasDoubles: IsDoubleElementsKind(kind)
  };
}
