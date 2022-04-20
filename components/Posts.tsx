import { gql, useQuery } from '@apollo/client';
import { Avatar, Card } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const { Meta } = Card;

const FeedQuery = gql`
  query FeedQuery {
    feed {
      id
      createdAt
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`;

const Posts: React.FC = () => {
  const { data: session, status } = useSession();

  const { loading, error, data } = useQuery(FeedQuery, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card title='Posts'>
      {data.feed.map((post: any) => (
        <div key={post.id} className='post'>
          <Link passHref href='/p/[id]' as={`/p/${post.id}`}>
            <Card hoverable style={{ marginTop: 16, width: '100%', margin: 'auto 0 50px' }} type='inner'>
              <Meta avatar={<Avatar src={`${session?.user?.image}`} />} title={post.title} description={post.content} />
            </Card>
          </Link>
        </div>
      ))}
    </Card>
  );
};

export default Posts;
