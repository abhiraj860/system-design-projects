#include <iostream>
#include <list>

using namespace std;

// A class is a template for an object.
// A class is a user defined data-type.
class YouTubeChannel {
// Access Modifier
public: // Can be accessed outside the class
    // Attributes: Something that describes an object (Property)
    // Attributes are represented by variables
    string Name;
    string OwnerName;
    int SubscribersCount;
    list<string> PublishedVideoTitles;

};

int main() {
    // Create an object of the class
    YouTubeChannel ytchannel;
    ytchannel.Name = "Abc";
    ytchannel.Owername = "Abhiraj";
    ytchannel.SubscribersCount = 1880;
    ytchannel.PublishedVideoTitles = {"C++ for beginners Video 1", "C++ OOP Video2"};

    // Printing the attributes of the object created above.
    cout << "Name: " << ytchannel.Name << endl;
    cout << "OwnerName: " << ytchannel.OwnerName << endl;
    cout << "SubscribersCount: " << ytchannel.SubscribersCount << endl;
    cout << "Videos: " << endl;
    for (string videoTitle: ytchannel.PublishedVideoTitles) {
        cout << videoTitle << end;
    } 
    return 0;
} 