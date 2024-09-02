import React from 'react';
import DOMPurify from 'dompurify';

interface QuillContentProps {
    content: string;
    className?: string;
}

const QuillContent: React.FC<QuillContentProps> = ({ content, className = '' }) => {
    const sanitizedContent = DOMPurify.sanitize(content);

    return (
        <div
            className={`quill-content ${className}`}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            style={
                {
                    '& h1, & h2, & h3, & h4, & h5, & h6': {
                        marginTop: '1em',
                        marginBottom: '0.5em',
                        fontWeight: 'bold',
                    },
                    '& h1': { fontSize: '2em' },
                    '& h2': { fontSize: '1.5em' },
                    '& h3': { fontSize: '1.17em' },
                    '& h4': { fontSize: '1em' },
                    '& h5': { fontSize: '0.83em' },
                    '& h6': { fontSize: '0.67em' },
                    '& p': {
                        marginBottom: '1em',
                    },
                    '& ul, & ol': {
                        marginBottom: '1em',
                        paddingLeft: '2em',
                    },
                    '& ul': {
                        listStyleType: 'disc',
                    },
                    '& ol': {
                        listStyleType: 'decimal',
                    },
                    '& a': {
                        color: '#1890ff',
                        textDecoration: 'none',
                    },
                    '& a:hover': {
                        textDecoration: 'underline',
                    },
                    '& blockquote': {
                        borderLeft: '4px solid #ccc',
                        marginLeft: 0,
                        paddingLeft: '1em',
                        color: '#666',
                    },
                    '& code': {
                        backgroundColor: '#f0f0f0',
                        padding: '0.2em 0.4em',
                        borderRadius: '3px',
                        fontFamily: 'monospace',
                    },
                    '& pre': {
                        backgroundColor: '#f0f0f0',
                        padding: '1em',
                        borderRadius: '3px',
                        overflowX: 'auto',
                    },
                    '& img': {
                        maxWidth: '100%',
                        height: 'auto',
                    },
                } as React.CSSProperties
            }
        />
    );
};

export default QuillContent;
