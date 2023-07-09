import { React, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';


export const CreatePost = () => {

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState('');

  const [redirect, setRedirect] = useState(false);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'align',
    'link',
    'image',
    'table',
    'formula',
  ];

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: 1 }, { header: 2 }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ align: [] }],
      ['link', 'image', 'table', 'formula'],
    ],
  };

  const createNewPost = async (e) => {

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);
    e.preventDefault();

    const response = await fetch('/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />
  }


  return (
    <div className=' pt-7 bg-gradient-to-b from-purple-600 to-black min-h-screen'>
       <h1 className='text-center text-white font-bold md:text-5xl text-4xl pb-3'>Create new Post</h1>
      <form className='px-8 py-3' onSubmit={createNewPost} action="">
        <div className='flex gap-1 flex-col' >
          <input value={title} onChange={(e) => setTitle(e.target.value)} className='px-2  text-white bg-black outline-none py-1  my-1  ' type="title" placeholder={'Title'} />
          <input value={summary} onChange={(e) => setSummary(e.target.value)} className='px-2 text-white bg-black outline-none py-1 my-1  ' type="Summary" placeholder={'Summary'} />

          <div className="mb-3">
            <input
              className="bg-black text-white px-1   py-1"
              type="file"
              id="formFile"
              name="file"              
              onChange={(e) => setFiles(e.target.files)} />
          </div>
        </div>

        <ReactQuill
          value={content}
          onChange={(newVal) => {
            const words = newVal.trim().split(/\s+/);
            if (words.length <= 69) {
              setContent(newVal);
            }
          }}
          className='bg-black text-white'
          formats={formats}
          modules={modules}
        />

        <div className='flex justify-center pt-3 items-center'>
          <button className='my-3 px-2 py-2 font-semibold w-2/4 rounded-md text-white bg-blue-800'>Create Post</button>
        </div>

      </form>

    </div>
  )
}
