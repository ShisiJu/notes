class Car 
  attr_accessor :name

  CONST = ['01' , '02'].freeze
  @@foo = 1
  def p_foo
    puts @@foo
  end

  def initialize(name)
    @name = name
  end

  def self.edit_const
    CONST.push '03'
  end
end


bmw = Car.new('bmw')
benz = Car.new('benz')
puts bmw.name
puts benz.name

bmw.p_foo
Car.edit_const
puts Car::CONST
