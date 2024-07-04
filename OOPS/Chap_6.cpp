#include <iostream>
using namespace std;

// Relationship between Virtual functions, pure virtual functions and abstract classes.
// A virtual function is a function that is defined in the base class and then it is 
// redefined in the derived class. But the main usecase of virtual function is to give the
// ability of runtime polymorphism. The function in the derived class takes the priority.
// When using virtual function the most derived function must be executed (that is the function in the derived class)
// Base Class
class Instrument {
public:
    // Below is virtual function. If there is an implementation of the MakeSound function in the
    // derived class execute that. If there are no implementation of the MakeSound function in
    // the derived class then only execute the MakeSound function here (in the base class) 
    virtual void MakeSound() {
        cout << "Instrument is playing..." << endl;
    } 

    // Pure virtual functions are functions that are not implemented in the base class but it will
    // force the derived class (class that inherit the base class) to implement that function (implement their own function).
    virtual void MakeCash() = 0; // Pure virtual function declaration. 
    // By defintition this class becomes an Abstract class as an Abstract class in C++ is class that 
    // has atleast one Pure virutal function (here MakeCash).
};

// Derived Class
class Accordian:public Instrument { // Inheritance
public:
    void MakeSound() {
        cout << "Accordian is playing..." << endl;
    }

    // This has to be created in this derived class because this is a Pure virtual function (see the Base Class)
    void MakeCash() {
        cout << "Make cash..." << endl;
    } 
};

class Piano:public Instrument {

public:
    // This function/method had to be created because of the Pure Virtual Function Implementation.
    void MakeCash() {
        cout << "Make Cash Piano..." << endl;
    }
};

int main() {
    // A pointer to the base class carries a reference to the derived class.
    Instrument* i1 = new Accordian(); // Note the Accordian is a derived class.
    // i1->MakeSound();
 
    Instrument* i2 = new Piano(); 
    // i2->MakeCash();

    // A code to run all the methods of an object all at once.
    Instrument* instruments[2] = {i1, i2};
    for(int i = 0; i < 2; i++) {
        instruments[i]->MakeCash();
    }

    return 0;
}