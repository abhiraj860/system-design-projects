#include <iostream>
using namespace std;

// Abstraction means that to hide the implementation details while exposing only certain functionality 
// so that the functionality can be used. Abstraction means that it does not change the functionality much
// for the end user (user interface) even if the implementation is changed inside the function.

// To build an Abstract class in C++, it should be noted that the Class must have atleast one Pure Virtual Function.
// Note we cannot create instances of Abstract Classes instead we can create pointers of Abstract Classes.
class Smartphone {
public:
// The function below is a pure virtual function and this makes the Class Smartphone, a Pure Virtual Function. 
// Below is also known as an Abstract Layer.    
    virtual void TakeASelfie() = 0;
    virtual void MakeACall() = 0;
};

class Android:public Smartphone {
public:
    void TakeASelfie() {
        cout << "Android Selfie" << endl;
    }
    void MakeACall() {
        cout << "Android Calling" << endl;
    }
};

class IPhone:public Smartphone {
public:
    void TakeASelfie() {
        cout << "Iphone Selfie" << endl;
    }
    void MakeACall() {
        cout << "IPhone calling" << endl;
    }
};

int main() {
    
    SmartPhone * s1 = new Android();    
    s1->TakeASelfie(); 
    s1->MakeACall();

    SmartPhone * s2 = new IPhone();    
    s2->TakeASelfie(); 
    s2->MakeACall();

    return 0;
}