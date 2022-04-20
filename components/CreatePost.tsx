import { InfoCircleOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client"
import { Button, Form, Input } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateDraftMutation = gql`
  mutation CreateDraftMutation(
    $title: String!
    $content: String
    $authorEmail: String!
  ) {
    createDraft(title: $title, content: $content, authorEmail: $authorEmail) {
      id
      title
      content
      published
      author {
        id
        name
      }
    }
  }
`

const CreatePost: React.FC = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [form] = Form.useForm();

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    const [createDraft, { loading, error, data}] = useMutation(CreateDraftMutation)

    const onFinish = async () => {
        await createDraft({
            variables: {
                title,
                content,
                authorEmail: session?.user?.email
            }
        }).then(() => router.push('/drafts'))
    }

    useEffect(() => {
        // push the user to home if not logged in
        // avoid being on /create route
        session ? null : router.push('/')
    }, [router, session])

    return (
        <Form
            style={{ maxWidth: 500, margin: '30px auto' }}
            form={form}
            layout='vertical'
            onFinish={onFinish}
        >
            <Form.Item name='title' label='Title' required tooltip='This is a required field'>
                <Input placeholder='type some fancy title' onChange={(e) => setTitle(e.target.value)} />
            </Form.Item>
            <Form.Item
                name='body'
                required
                label='Content'
                tooltip={{
                    title: 'This is a required field',
                    icon: <InfoCircleOutlined />
                }}
            >
                <Input.TextArea placeholder='type fun content' onChange={(e) => setContent(e.target.value)} />
            </Form.Item>
            <Form.Item>
                <Button loading={loading} disabled={!content || !title} htmlType="submit" type='primary'>Save</Button>
            </Form.Item>
        </Form>
    )
}

export default CreatePost