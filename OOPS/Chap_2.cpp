#include <iostream>
#include <list>

using namespace std;

class YouTubeChannel {
public:     
    string Name;
    string OwnerName;
    int SubscribersCount;
    list<string> PublishedVideoTitles;

// A constructor is a special type of method that is invoked everytime an object is created. 
// A constructor does not have a return type.
// The name of the constructor is same as that of a class.
    YouTubeChannel (string name, string ownerName) {
        Name = name;
        OwnerName = ownerName;
        SubscribersCount = 0;
    }
// Class methods define the behaviour of a class.
// Creata a GetInfo method
    void GetInfo() {
        cout << "name: " << Name << endl;
        cout << "ownername: " << OwnerName << endl;
        cout << "subscriberscount: " << SubscriberCount << endl;
        cout << "videos: " << endl;
        for (string videoTitle: PublishedVideoTitles) {
            cout << videoTitle << end;
        } 
    }
};

int main() {

    // Creating two objects using the constructor of the class.
    // Constructors are used to implement the DRY principle
    YouTubeChannel ytchannel("Abc", "Abhiraj");
    YouTubeChannel ytchannel2("Abcd", "Aditya");
    // Initialising properties of the attributes of an object.
    ytchannel.PublishedVideoTitles.push_back("C++ for beginners");
    ytchannel.PublishedVideoTitles.push_back("C++ oop");
    
    // Invoking a method from an object
    ytchannel.GetInfo();
    ytchannel2.GetInfo();
    return 0;
} 