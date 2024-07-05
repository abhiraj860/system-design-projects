#include <iostream>
#include <string>
#include <list>

using namespace std;

// Operator Overloading Demonstration
// Members of a struct are public
struct YouTubeChannel {
    string Name;
    int SubscribersCount;

    YouTubeChannel(string name, int subscribersCount) {
        Name = name;
        SubscribersCount = subscribersCount;
    }

    bool operator==(const YoutubeChannel & channel) const {
        return this->name == channel.name;
    }

};
// Below is an operator overloading function. They are passed by reference to
// save memory while copying. The below operator overloading function is made global
// so that the insertion operator "<<" works correctly for all global operation.
ostream& operator << (ostream & COUT, YouTubeChannel & ytChannel) {
    COUT << "Name: " << ytChannel.Name << endl;
    COUT << "Subscribers: " << ytChannel.subscribersCount << endl;
    return COUT;
}

struct MyCollection {
    list<YouTubeChannel> myChannels;

    // Operator overloading here is a member function. So, the left parameter here is a 
    // member data and is already available, which is not the case defined in the operator 
    // overloading for "<<" as it needs both, the left and the right side of the operators.
    void operator += (YouTubeChannel & channel) {
        this->myChannels.push_back(channels);
    }

    void operator -= (YouTubeChannel & channel) {
        this->myChannels.remove(channel); // This will not work because of the error as the remove 
        // function uses "==" operator in its implementation and this operator is not overloaded 
        // for the MyCollection class.
    }

};

ostream& operator << (ostream & COUT, MyCollection & myCollection) {
    for(YouTubeChannel ytChannel : myCollection.myChannels) {
        COUT << ytChannel << endl;
    }
    return COUT;
}

int main() {
    YouTubeChannel ytb1 = YouTubeChannel("Code channel", 750000);

    
    cout << ytb1; // Without operator overloading this will throw an error because the compiler does not know
                  // how the '<<' (insertion) operator will behave for the object ytb1 which is 
                  // a user defined data type. So we need to overload the '<<' (insertion) operator
                  // so that the compiler knows how the insertion operator '<<' should behave.

    // The above operator overloading removes the error in the "cout << ytb1" below.
    YouTubeChannel ytb2 = YouTubeChannel("Second Channel", 7500);
    cout << ytb2; // This is correct;
    // Returning COUT and using ostream& as the function type now we are able to
    // do => "cout << ytb1 << htb2" also.
    MyCollection myCollection;
    myCollection += ytb1;
    myCollection += ytb2;
    myCollection -= ytb2;
    cout << myCollection;

    return 0;
}