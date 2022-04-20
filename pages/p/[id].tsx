import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import PostDetail from '../../components/PostDetail';

const PostQuery = gql`
  query PostQuery($postId: String!) {
    post(postId: $postId) {
      id
      title
      createdAt
      content
      published
      author {
        id
        name
      }
    }
  }
`;

const Detail = () => {
  const postId = useRouter().query.id;
  const { loading, error, data } = useQuery(PostQuery, {
    variables: { postId }
  });

  if (loading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <PostDetail data={data} />;
};

export default Detail;
