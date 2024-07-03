#include <iostream>
#include <list>

using namespace std;


// Parent Class
class YouTubeChannel {

private:     
    string Name;
    int SubscribersCount;
    list<string> PublishedVideoTitles;

// Protected access modifier is used to make the OwnerName attribute accessible in the derived class.
// This is because the private attributes are inaccessible to the derived classes.
protected:
    string OwnerName;


public:
    YouTubeChannel (string name, string ownerName) {
        Name = name;
        OwnerName = ownerName;
        SubscribersCount = 0;
    }

    void GetInfo() {
        cout << "name: " << Name << endl;
        cout << "ownername: " << OwnerName << endl;
        cout << "subscriberscount: " << SubscriberCount << endl;
        cout << "videos: " << endl;
        for (string videoTitle: PublishedVideoTitles) {
            cout << videoTitle << end;
        } 
    }

    void Subscribe() {
        SubscriberCounter++;
    }

    void Unsubscribe() {
        if (SubscriberCounter > 0) {
            SubscriberCounter--;
        }
    }

    void PublishVideo(string title) {
        PublishedVideoTitles.push_back(title);
    }
};

// Inheritance: Inherit all the properties and methods from the YouTubeChannel (Base Class)
// The public access modifier below shows that whatever methods are public in 
// the parent (base) class should be public in the children (derived) class. So the methods in 
// the inherited class should be public as they are public in the parent/base class.

// Derived Class
class CookingYouTubeChannel:public YouTubeChannel {

// For the Derived Class contructor is a must. Note a constructor must be made public.
public:
    CookingYouTubeChannel(string name, string ownerName):YouTubeChannel(name, ownerName) {
        // Note that we do not need to initialise the constructor, as it will be automatically
        // initialized. The code :YouTubeChannel(name, ownerName) tells it to do so (initialize the inherited class constructor).  
    }
    // Additional method for the inherited class.
    void Practice() {
        // Note the OwnerName attribute is not available to this class as the OwnerName attribute is private in the base class
        // and this is not accessible to the derived class. 
        // So make the OwnerName protected instead of private in the base so that it is accessible to the derived class.
        cout << OwnerName << "practicing cooking, learning new recipies, experimenting with spices..." << endl;
    }
};

int main() {
    CookingYouTubeChannel cookingYTChannel("Abhiraj Channel", "Abhiraj");
    // This works as it is inherited from the base class.
    cookingYTChannel.PublishVideo("Apple pie");
    cookingYTChannel.PublishVideo("Chocolate video");\
    cookingYTChannel.Subscribe();
    cookingYTChannel.Subscribe();
    cookingYTChannel.GetInfo();
    cookingYTChannel.Practice();
    return 0;
} 