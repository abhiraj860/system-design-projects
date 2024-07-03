#include <iostream>
#include <list>

using namespace std;
// Polymorphism: Same method name but different implementations.
// Polymorphism is when a method has the same name but different implementations.
// In the below example we can see that the two derived classes have the same method name 
// Practice, but they have totally different implementation and this is known as Polymorphism.

// Parent/Base Class
class YouTubeChannel {

private:     
    string Name;
    int SubscribersCount;
    list<string> PublishedVideoTitles;

// Protected access modifier is used to make the OwnerName attribute accessible in the derived class.
// This is because the private attributes are inaccessible to the derived classes.
protected:
    string OwnerName;
    int ContentQuality; // Made protected so that it is accessed by the derived class.

public:
    YouTubeChannel (string name, string ownerName) {
        Name = name;
        OwnerName = ownerName;
        SubscribersCount = 0;
        ContentQuality = 0;
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

    void CheckAnalytics() {
        if(ContentQuality < 5) cout << Name << " has bad quality content." << endl;
        else cout << Name << " has great content." << endl; 
    }
};

// Derived Class
class CookingYouTubeChannel:public YouTubeChannel {

public:
    CookingYouTubeChannel(string name, string ownerName):YouTubeChannel(name, ownerName) {
        
    }
    
    // Polymorphism
    void Practice() {
        cout << OwnerName << "practicing cooking, learning new recipies, experimenting with spices..." << endl;
        ContentQuality++;
    }
};

// Derived Class
class SingersYouTubeChannel:public YouTubeChannel {

public:
    SingersYouTubeChannel(string name, string ownerName):YouTubeChannel(name, ownerName) {
        
    }

    // Polymorphism
    void Practice() {
        cout << OwnerName << "practicing singing, learning new dances, experimenting with dances..." << endl;
        ContentQuality++;
    }
};

int main() {
    CookingYouTubeChannel cookingYTChannel("Abhiraj Channel", "Abhiraj");
    cookingYTChannel.Practice();
    SingersYouTubeChannel singersYTChannel("JohnSings", "John");
    singersYTChannel.Practice();

    // Demonstration of using pointers to point to an object of derived class and store that pointer to the pointer of the base class.
    YouTubeChannel * yt1 = &cookingYTChannel;
    YouTubeChannel * yt2 = &singersYTChannel;

    // Invoke the CheckAnalytics() method using the pointer of the base class.
    yt1->CheckAnalytics();
    yt2->CheckAnalytics();

    return 0;
} 