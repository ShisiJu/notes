// Copyright 2019 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

@abstract
@generateCppClass
extern class FixedArrayBase extends HeapObject {
  // length of the array.
  const length: Smi;
}

@generateBodyDescriptor
@generateCppClass
extern class FixedArray extends FixedArrayBase {
  objects[length]: Object;
}

type EmptyFixedArray extends FixedArray;

@generateCppClass
extern class FixedDoubleArray extends FixedArrayBase {
  floats[length]: float64_or_hole;
}

@generateBodyDescriptor
@generateCppClass
extern class WeakFixedArray extends HeapObject {
  const length: Smi;
  objects[length]: MaybeObject;
}

@generateCppClass
extern class ByteArray extends FixedArrayBase {
  bytes[length]: uint8;
}

@hasSameInstanceTypeAsParent
@generateCppClass
@doNotGenerateCast
extern class ArrayList extends FixedArray {
}

@hasSameInstanceTypeAsParent
@generateCppClass
@doNotGenerateCast
extern class TemplateList extends FixedArray {
}

@generateBodyDescriptor
@generateCppClass
extern class WeakArrayList extends HeapObject {
  const capacity: Smi;
  length: Smi;
  objects[capacity]: MaybeObject;
}

extern operator '.length_intptr' macro LoadAndUntagFixedArrayBaseLength(
    FixedArrayBase): intptr;

extern operator '.objects[]' macro LoadFixedArrayElement(
    FixedArray, intptr): Object;
extern operator '.objects[]' macro LoadFixedArrayElement(
    FixedArray, Smi): Object;
extern operator '.objects[]' macro LoadFixedArrayElement(
    FixedArray, constexpr int31): Object;
extern operator '.objects[]=' macro StoreFixedArrayElement(
    FixedArray, intptr, Smi): void;
extern operator '.objects[]=' macro StoreFixedArrayElement(
    FixedArray, Smi, Smi): void;
extern operator '.objects[]=' macro StoreFixedArrayElement(
    FixedArray, intptr, HeapObject): void;
extern operator '.objects[]=' macro StoreFixedArrayElement(
    FixedArray, intptr, Object): void;
extern operator '.objects[]=' macro StoreFixedArrayElement(
    FixedArray, constexpr int31, Smi): void;
extern operator '.objects[]=' macro StoreFixedArrayElement(
    FixedArray, constexpr int31, HeapObject): void;
extern operator '.objects[]=' macro StoreFixedArrayElement(
    FixedArray, Smi, Object): void;
extern macro StoreFixedArrayElement(
    FixedArray, Smi, Object, constexpr WriteBarrierMode): void;
extern macro StoreFixedArrayElement(
    FixedArray, Smi, Smi, constexpr WriteBarrierMode): void;
extern macro StoreFixedArrayElement(
    FixedArray, constexpr int31, Object, constexpr WriteBarrierMode): void;
extern macro StoreFixedArrayElement(
    FixedArray, constexpr int31, Smi, constexpr WriteBarrierMode): void;
extern macro StoreFixedArrayElement(
    FixedArray, intptr, Object, constexpr WriteBarrierMode): void;
extern macro StoreFixedArrayElement(
    FixedArray, intptr, Smi, constexpr WriteBarrierMode): void;
extern operator '.floats[]=' macro StoreFixedDoubleArrayElement(
    FixedDoubleArray, intptr, float64): void;
extern operator '.floats[]=' macro StoreFixedDoubleArrayElement(
    FixedDoubleArray, Smi, float64): void;
extern operator '.floats[]' macro LoadFixedDoubleArrayElement(
    FixedDoubleArray, intptr): float64;
operator '[]=' macro StoreFixedDoubleArrayDirect(
    a: FixedDoubleArray, i: Smi, v: Number) {
  a.floats[i] = Convert<float64_or_hole>(Convert<float64>(v));
}
operator '[]=' macro StoreFixedArrayDirect(a: FixedArray, i: Smi, v: Object) {
  a.objects[i] = v;
}

extern macro AllocateFixedArray(
    constexpr ElementsKind, intptr, constexpr AllocationFlag): FixedArrayBase;

extern macro AllocateZeroedFixedArray(intptr): FixedArray;
extern macro AllocateZeroedFixedDoubleArray(intptr): FixedDoubleArray;
extern macro CalculateNewElementsCapacity(Smi): Smi;
extern macro CalculateNewElementsCapacity(intptr): intptr;

extern macro AllocateFixedArrayWithHoles(
    intptr, constexpr AllocationFlag): FixedArray;
extern macro AllocateFixedDoubleArrayWithHoles(
    intptr, constexpr AllocationFlag): FixedDoubleArray;
extern macro CopyFixedArrayElements(
    constexpr ElementsKind, FixedArray, constexpr ElementsKind, FixedArray,
    intptr, intptr): void;
extern macro CopyFixedArrayElements(
    constexpr ElementsKind, FixedArray, constexpr ElementsKind, FixedArray,
    intptr, intptr, intptr): void;

macro ExtractFixedArray(
    source: FixedArray, first: intptr, count: intptr,
    capacity: intptr): FixedArray {
  // TODO(tebbi): This should be optimized to use memcpy for initialization.
  return NewFixedArray(
      capacity,
      IteratorSequence<Object>(
          (&source.objects).Iterator(first, first + count),
          ConstantIterator(TheHole)));
}
macro ExtractFixedDoubleArray(
    source: FixedDoubleArray, first: intptr, count: intptr,
    capacity: intptr): FixedDoubleArray|EmptyFixedArray {
  // TODO(tebbi): This should be optimized to use memcpy for initialization.
  return NewFixedDoubleArray(
      capacity,
      IteratorSequence<float64_or_hole>(
          (&source.floats).Iterator(first, first + count),
          ConstantIterator(kDoubleHole)));
}

namespace runtime {
extern runtime FatalProcessOutOfMemoryInvalidArrayLength(NoContext): never;
}

macro NewFixedArray<Iterator: type>(length: intptr, it: Iterator): FixedArray {
  if (length == 0) return kEmptyFixedArray;
  if (length > kFixedArrayMaxLength) deferred {
      runtime::FatalProcessOutOfMemoryInvalidArrayLength(kNoContext);
    }
  return new
  FixedArray{map: kFixedArrayMap, length: Convert<Smi>(length), objects: ...it};
}

macro NewFixedDoubleArray<Iterator: type>(
    length: intptr, it: Iterator): FixedDoubleArray|EmptyFixedArray {
  if (length == 0) return kEmptyFixedArray;
  if (length > kFixedDoubleArrayMaxLength) deferred {
      runtime::FatalProcessOutOfMemoryInvalidArrayLength(kNoContext);
    }
  return new FixedDoubleArray{
    map: kFixedDoubleArrayMap,
    length: Convert<Smi>(length),
    floats: ...it
  };
}
