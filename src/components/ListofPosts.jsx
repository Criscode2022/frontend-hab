import { useState, useEffect, useContext } from 'react';
import Post from './Post';
import { AuthContext } from '../context/AuthContext';

const ListofPosts = () => {
  const [postsData, setPostsData] = useState([]);
  const [badgeCounts, setBadgeCounts] = useState({}); // Track badge counts by postId
  const userIdLogged = useContext(AuthContext).userId;
  console.log('userIdLogged', userIdLogged);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    // Realizar la solicitud HTTP para obtener los datos de localhost:3000/posts
    fetch('http://https://backend-hab.onrender.com/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Extraer la propiedad 'data' del objeto JSON
        const postDataArray = data.data;

        // Actualizar el estado con los datos obtenidos
        setPostsData(postDataArray);

        // Initialize badge counts
        const initialBadgeCounts = {};
        postDataArray.forEach((post) => {
          initialBadgeCounts[post.id_post] = post.like_count;
        });
        setBadgeCounts(initialBadgeCounts);
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, [token]);

  // Function to update badge count for a specific postId
  const updateBadgeCount = (postId, count) => {
    setBadgeCounts((prevCounts) => ({
      ...prevCounts,
      [postId]: count,
    }));
  };

  const handleDeletePost = (postId) => {
    // Remove the deleted post from the postsData state
    setPostsData(postsData.filter((post) => post.id_post !== postId));
  };

  return (
    <>
      <h2>Enlaces</h2>

      <div id='postsContainer'>
        {postsData.map((post) => (
          <Post
            key={post.id_post}
            title={post.post_title}
            content={post.post_description}
            url={post.post_url}
            imageUrl={post.post_img}
            postId={post.id_post}
            userId={post.id_user}
            onDelete={handleDeletePost}
            userName={post.name_user}
            likes={post.like_count}
            biography={post.biography_user}
            updateBadgeCount={updateBadgeCount}
            isLoggedUserPost={post.id_user === userIdLogged}
            avatar={post.avatar_user}
          />
        ))}
      </div>
    </>
  );
}

export default ListofPosts;
