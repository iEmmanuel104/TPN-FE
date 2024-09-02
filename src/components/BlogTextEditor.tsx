import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Form } from 'antd';

interface BlogTextEditorProps {
    name: string;
    label: string;
}

const BlogTextEditor: React.FC<BlogTextEditorProps> = ({ name, label }) => {
    const quillModules = useMemo(
        () => ({
            toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ direction: 'rtl' }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ color: [] }, { background: [] }],
                [{ font: [] }],
                [{ align: [] }],
                ['clean'],
            ],
        }),
        [],
    );

    const quillFormats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'list',
        'bullet',
        'script',
        'indent',
        'direction',
        'size',
        'color',
        'background',
        'font',
        'align',
    ];

    return (
        <Form.Item name={name} label={label} rules={[{ required: true }]}>
            <ReactQuill theme="snow" modules={quillModules} formats={quillFormats} />
        </Form.Item>
    );
};

export default BlogTextEditor;
