import { useState, useEffect, useContext } from 'react';
import Post from './Post';
import { AuthContext } from '../context/AuthContext';

const ListofPosts = () => {
  const [postsData, setPostsData] = useState([]);
  const [badgeCounts, setBadgeCounts] = useState({});
  const userIdLogged = useContext(AuthContext).userId;
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch('https://backend-hab.onrender.com/posts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const postDataArray = data.data;
        setPostsData(postDataArray);
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

  const updateBadgeCount = (postId, count) => {
    setBadgeCounts((prevCounts) => ({
      ...prevCounts,
      [postId]: count,
    }));
  };

  const handleDeletePost = (postId) => {
    setPostsData(postsData.filter((post) => post.id_post !== postId));
  };

  // Filtrar los posts para mostrar solo los que tienen isLoggedUserPost en true
  const filteredPosts = postsData.filter((post) => post.id_user === userIdLogged);

  return (
    <>
      <h2>Enlaces</h2>

      <div id="postsContainer">
        {filteredPosts.map((post) => (
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
            isLoggedUserPost={true} // Solo mostrará los posts del usuario logueado
            avatar={post.avatar_user}
          />
        ))}
      </div>
    </>
  );
}

export default ListofPosts;
