import { useState, useEffect, useContext } from 'react';
import Post from './Post';
import { AuthContext } from '../context/AuthContext';

const ListofPostsFollowing = () => {
  const [postsData, setPostsData] = useState([]);
  const [badgeCounts, setBadgeCounts] = useState({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // Fetch the list of users you are following
    fetch('https://backend-hab.onrender.com/users/following', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((followResponse) => followResponse.json())
      .then((followData) => {
        console.log('Follow Data:', followData);

        // Extract user IDs from the followData
        const usersFollowed = followData;
        console.log('Users Followed:', usersFollowed);

        // Fetch the list of posts
        fetch('https://backend-hab.onrender.com/posts', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Posts Data:', data);

            const postDataArray = data.data;

            // Initialize badge counts
            const initialBadgeCounts = {};
            postDataArray.forEach((post) => {
              initialBadgeCounts[post.id_post] = post.like_count;
            });
            setBadgeCounts(initialBadgeCounts);

            // Filter the posts based on the following users
            const filteredPosts = postDataArray.filter((post) =>
              usersFollowed.includes(post.id_user)
            );
            console.log('Filtered Posts:', filteredPosts);

            setPostsData(filteredPosts);
          })
          .catch((error) => {
            console.error('Error al obtener los datos de los posts:', error);
          });
      })
      .catch((error) => {
        console.error('Error al obtener la lista de usuarios seguidos:', error);
      });
  }, [token]);

  // Function to update badge count for a specific postId
  const updateBadgeCount = (postId, count) => {
    setBadgeCounts((prevCounts) => ({
      ...prevCounts,
      [postId]: count,
    }));
  };

  return (
    <>
      <h2>Enlaces</h2>

      <div id="postsContainer">
        {postsData.map((post) => (
          <Post
            key={post.id_post}
            title={post.post_title}
            content={post.post_description}
            url={post.post_url}
            imageUrl={post.post_img}
            postId={post.id_post}
            userId={post.id_user}
            userName={post.name_user}
            likes={post.like_count}
            updateBadgeCount={updateBadgeCount}
          />
        ))}
      </div>
    </>
  );
};

export default ListofPostsFollowing;
