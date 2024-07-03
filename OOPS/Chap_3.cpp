#include <iostream>
#include <list>

using namespace std;
// Making the properties/attributes private means encapsulation.
class YouTubeChannel {
// Encapsulation: It says that the properties/attributes below should not be public.
// The property/attributes below should be private. 
// The value of the property should be changed by using methods only.
// The value of the property should be retrieved/accessed by using methods only.
private:     
    string Name;
    string OwnerName;
    int SubscribersCount;
    list<string> PublishedVideoTitles;

// The methods are made public so that they can provide an interface to change
// the value of the property.
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

    // Method to increase an attribute of a class (As encapsulation says that the attributes
    // should be private and must be changed/manipulated or accessed by methods only)
    void Subscribe() {
        SubscriberCounter++;
    }

    void Unsubscribe() {
        if (SubscriberCounter > 0) {
            SubscriberCounter--;
        }
    }

    // Method with an argument
    void PublishVideo(string title) {
        PublishedVideoTitles.push_back(title);
    }
};

int main() {

    YouTubeChannel ytchannel("Abc", "Abhiraj");
    YouTubeChannel ytchannel2("Abcd", "Aditya");

    // Invoke the subscribe method
    ytchannel.Subscribe();
    ytchannel.Subscribe();
    ytchannel.Subscribe();
    
    // Invoke the unsubscribe method
    ytchannel.Unsubscribe();
    ytchannel.Unsubscribe();
    
    // Invoking the PublishVideo method 
    ytchannel.PublishVideo("C++ videos for beginners");
    ytchannel.PublishVideo("C++ oops for beginners");

    // Below code cannot be accessed as the properties are private now.
    // ytchannel.PublishedVideoTitles.push_back("C++ for beginners");
    // ytchannel.PublishedVideoTitles.push_back("C++ oop");
    

    ytchannel.GetInfo();
    ytchannel2.GetInfo();
    return 0;
} 