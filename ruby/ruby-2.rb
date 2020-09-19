class Car
  def initialize(name)
    @name = name
  end  
end

main0 = 'main0'

module MyModule
  module1 = 'module1'
  puts "enter MyModule locals: #{local_variables}"
  
  class MyClass
    class2 = 'class2'
    puts "enter MyClass locals: #{local_variables}"
    
    def my_method
      method_3 = 'method3'
      puts "my_method locals: #{local_variables}"
    end
    
    puts "exit MyClass locals: #{local_variables}"
  end
  
  puts "exit MyModule locals: #{local_variables}"
end
    
obj = MyModule::MyClass.new
obj.my_method
puts "main locals: #{local_variables}"

