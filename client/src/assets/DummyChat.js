const chat = [
    {
        "_id": "1",
        "senderId": "user_1",
        "receiverId": "user_2",
        "text": "Hey — you free for a call in 10?",
        "seen": true,
        //  "image": "https://img.freepik.com/premium-photo/random-image_590832-9602.jpg",
        "createdAt": "2025-10-28T08:12:00Z"
    },
    {
        "_id": "2",
        "senderId": "user_2",
        "receiverId": "user_1",
        "text": "Give me 5, finishing breakfast 🍳",
        "seen": true, 
        // "image": "https://img.freepik.com/premium-photo/random-image_590832-9602.jpg",
        "createdAt": "2025-10-28T08:13:30Z"
    },
    {
        "_id": "3",
        "senderId": "user_1",
        "receiverId": "user_2",
        "text": "No rush — just ping me when you are ready.",
        "seen": false, 
        // "image": "https://img.freepik.com/premium-photo/random-image_590832-9602.jpg",
        "createdAt": "2025-10-28T08:15:02Z"
    },
    { "_id": "4", "senderId": "user_3", "receiverId": "user_1", "text": "Did you push the latest build to staging?", "seen": true, "image": "https://img.freepik.com/premium-photo/random-image_590832-9602.jpg", "createdAt": "2025-10-27T16:45:10Z" },
    { "_id": "5", "senderId": "user_1", "receiverId": "user_3", "text": "Yes — deployed at 16:40. Running smoke tests now.", "seen": true, "image": "https://img.freepik.com/premium-photo/random-image_590832-9602.jpg", "createdAt": "2025-10-27T16:46:55Z" },
    { "_id": "6", "senderId": "user_4", "receiverId": "user_5", "text": "Happy birthday! 🎉 When are we celebrating?", "seen": false, "image": "https://img.freepik.com/premium-photo/random-image_590832-9602.jpg", "createdAt": "2025-10-26T11:00:00Z" },
    { "_id": "7", "senderId": "user_5", "receiverId": "user_4", "text": "Thanks! Saturday evening works for me.", "seen": true, "image": "https://img.freepik.com/premium-photo/random-image_590832-9602.jpg", "createdAt": "2025-10-26T11:02:12Z" },
]
export default chat;