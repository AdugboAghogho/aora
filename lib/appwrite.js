

import {
    Account,
    Avatars,
    Client,
    Databases,
    ID,
    Query,
    Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.jsm_kelvin.aora",
    projectId: "67845102002a30652613",
    storageId: "678458fb0009e99b6439",
    databaseId: "67845479000f3b9d916a",
    userCollectionId: "678455600027c5ff5450",
    videoCollectionId: "678455c30031e7e2b9d5",
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export async function createUser(email, password, username) {
    try {
        // Create an account in Appwrite
        const newAccount = await account.create(ID.unique(), email, password, username);
        console.log("New account created:", newAccount);

        // Generate user avatar
        const avatarUrl = avatars.getInitials(username);

        // Create a corresponding document in the user collection
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );
        console.log("User document created in database:", newUser);

        // Sign in after successful user creation
        await signIn(email, password);

        return newUser;
    } catch (error) {
        console.error("Error during user creation:", error.message);
        throw new Error(error.message);
    }
}

// Sign In
export async function signIn(email, password) {
    try {
        const session = await account.createEmailPasswordSession(email, password); // Updated method
        console.log("Session created successfully:", session);
        return session;
    } catch (error) {
        console.error("Error during sign-in:", error.message);
        throw new Error(error.message);
    }
}

// Other functions remain unchanged unless explicitly mentioned.


// Get Account
export async function getAccount() {
    try {
        const currentAccount = await account.get();
        // console.log("Current account:", currentAccount);
        return currentAccount;
    } catch (error) {
        console.error("Error fetching account:", error.message);
        throw new Error(error.message);
    }
}

// Get Current User
export async function getCurrentUser() {
    try {
        const currentAccount = await getAccount();
        // console.log("Account retrieved:", currentAccount);

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser.documents.length) {
            console.error("No user found in database for account ID:", currentAccount.$id);
            return null;
        }

        // console.log("User retrieved from database:", currentUser.documents[0]);
        return currentUser.documents[0];
    } catch (error) {
        console.error("Error fetching current user:", error.message);
        return null;
    }
}

// Sign Out
export async function signOut() {
    try {
        const session = await account.deleteSession("current");
        console.log("Session deleted successfully:", session);
        return session;
    } catch (error) {
        console.error("Error during sign-out:", error.message);
        throw new Error(error.message);
    }
}

// Upload File
export async function uploadFile(file, type) {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        console.log("File uploaded successfully:", fileUrl);
        return fileUrl;
    } catch (error) {
        console.error("Error during file upload:", error.message);
        throw new Error(error.message);
    }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
    let fileUrl;

    try {
        if (type === "video") {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === "image") {
            fileUrl = storage.getFilePreview(
                appwriteConfig.storageId,
                fileId,
                2000,
                2000,
                "top",
                100
            );
        } else {
            throw new Error("Invalid file type");
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        console.error("Error during file preview generation:", error.message);
        throw new Error(error.message);
    }
}

// Create Video Post
export async function createVideoPost(form) {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );
        console.log("Video post created successfully:", newPost);
        return newPost;
    } catch (error) {
        console.error("Error during video post creation:", error.message);
        throw new Error(error.message);
    }
}

// Additional Functions...

// Example: Get All Posts
export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videoCollectionId
        );
        console.log("Posts retrieved successfully:", posts.documents);
        return posts.documents;
    } catch (error) {
        console.error("Error fetching all posts:", error.message);
        throw new Error(error.message);
    }
}


// Get video posts created by user
export async function getUserPosts(userId) {
try {
    const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.equal("creator", userId)]
    );

    return posts.documents;
} catch (error) {
    throw new Error(error);
}
}

// Get video posts that matches search query
export async function searchPosts(query) {
try {
    const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents;
} catch (error) {
    throw new Error(error);
}
}

// Get latest created video posts
export async function getLatestPosts() {
try {
    const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents;
} catch (error) {
    throw new Error(error);
}
}    