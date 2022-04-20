import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { Avatar, Card } from 'antd';
import Link from 'next/link';

const { Meta } = Card;

const DraftsQuery = gql`
  query DraftsQuery {
    drafts {
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

const DraftPosts: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const { loading, error, data } = useQuery(DraftsQuery, {
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    // push the user to home if not logged in
    // avoid being on /drafts route
    session ? null : router.push('/');
  }, [session, router]);

  if (loading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card title='Drafts'>
      {data.drafts.map((post: any) => (
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

export default DraftPosts;
