import Post from "../db/postModel.js";
import dotenv from "dotenv";

dotenv.config();
const JSON_URI = process.env.JSON_URI;

export async function getAllPostsWithNames(req, res) {
  try {
    const mongoRequest = Post.find({}, { __v: false });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([
      mongoRequest,
      placeholderRequest,
    ]);

    const placeholderPosts = await placeholderResponse.json();

    const combinedPosts = [...placeholderPosts, ...mongoResponse];

    const serializedMongoPosts = combinedPosts.map((post) => ({
      id: post.id,
      name: post.name,
    }));

    res.json(serializedMongoPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPostsWithEmails(req, res) {
  try {
    const mongoRequest = Post.find({}, { id: true, name: true, email: true });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([
      mongoRequest,
      placeholderRequest,
    ]);

    const placeholderPosts = await placeholderResponse.json();

    const combinedPosts = [...placeholderPosts, ...mongoResponse];

    const serializedPosts = combinedPosts.map((post) => ({
      id: post.id,
      name: post.name,
      email: post.email,
    }));

    res.json(serializedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getPostsWithAddress(req, res) {
  try {
    const mongoRequest = Post.find({}, { id: true, name: true, address: true });
    const placeholderRequest = fetch(JSON_URI);

    const [mongoResponse, placeholderResponse] = await Promise.all([
      mongoRequest,
      placeholderRequest,
    ]);

    const placeholderPosts = await placeholderResponse.json();

    const combinedPosts = [...placeholderPosts, ...mongoResponse];

    const serializedPosts = combinedPosts.map((post) => {
      if (!post.address) {
        return {
          id: post.id,
          name: post.name,
        };
      }

      return {
        id: post.id,
        name: post.name,
        address: `${post.address.street}, ${post.address.suite}, ${post.address.city}, ${post.address.zipcode}`,
      };
    });

    res.json(serializedPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createNewPost(req, res) {
  try {
    const { name, email, address } = req.body;

    const post = await Post.create({ name, email, address });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getAllPostsFromMongoDb(req, res) {
  try {
    const mongoRequest = await Post.find({ __v: false });

    const serializedMongoPosts = mongoRequest.map((post) => ({
      id: post.id,
      name: post.name,
      email: post.email,
      address: `${post.address.street}, ${post.address.suite}, ${post.address.city}, ${post.address.zipcode}`,
    }));
    res.json(serializedMongoPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
