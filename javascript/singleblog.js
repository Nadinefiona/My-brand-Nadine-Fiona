const { createStore } = Redux;
const { Provider, useSelector, useDispatch } = ReactRedux;

const initialState = {
    blog: {},
    comments: [],
    likes: 0,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_BLOG':
            return { ...state, blog: action.payload };
        case 'SET_COMMENTS':
            return { ...state, comments: action.payload };
        case 'SET_LIKES':
            return { ...state, likes: action.payload };
        default:
            return state;
    }
};

const store = createStore(reducer);

function SingleBlog() {
    const dispatch = useDispatch();
    const blog = useSelector(state => state.blog);
    const comments = useSelector(state => state.comments);
    const likes = useSelector(state => state.likes);

    const [form, setForm] = React.useState({ fullName: '', email: '', commentText: '' });

    React.useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');
        if (blogId) {
            fetchBlog(blogId);
            fetchComments(blogId);
            fetchLikes(blogId);
        }

        const heartIcon = document.getElementById('heartIcon');
        const handleClick = () => {
            if (navigator.vibrate) {
                navigator.vibrate(500);
            }

            heartIcon.classList.add('enlarged');
            heartIcon.style.color = 'red';

            setTimeout(() => {
                heartIcon.classList.remove('enlarged');
                heartIcon.style.color = '';
            }, 1000);
        };
        heartIcon.addEventListener('click', handleClick);

        return () => {
            heartIcon.removeEventListener('click', handleClick);
        };
    }, []);

    const fetchBlog = (blogId) => {
        fetch(`https://mybrand-be-2.onrender.com/api/blogs/${blogId}`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'SET_BLOG', payload: data });
            })
            .catch(error => console.error('Error fetching single blog:', error));
    };

    const fetchComments = (blogId) => {
        fetch(`https://mybrand-be-2.onrender.com/api/blogs/${blogId}/comments`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'SET_COMMENTS', payload: data.comments });
            })
            .catch(error => console.error('Error fetching comments:', error));
    };

    const fetchLikes = (blogId) => {
        fetch(`https://mybrand-be-2.onrender.com/api/blogs/${blogId}/likes`)
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'SET_LIKES', payload: data.likeCount });
            })
            .catch(error => console.error('Error fetching likes:', error));
    };

    const handleLike = () => {
        const blogId = blog._id; 
        if (!blogId) return; 
        fetch(`https://mybrand-be-2.onrender.com/api/blogs/${blogId}/like`, { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    dispatch({ type: 'SET_LIKES', payload: likes + 1 });
                }
            })
            .catch(error => console.error('Error liking the post:', error));
    };
    
    

    const handleCommentSubmit = (event) => {
        event.preventDefault();
        const blogId = blog._id; 
        if (!blogId) return;
        
        const { fullName, email, commentText } = form; 
        
        if (!fullName || !email || !commentText) {
            console.error('Name, email, and comment are required.');
            return;
        }

        const commentData = {
            name: fullName,
            email: email,
            comment: commentText
        };

        fetch(`https://mybrand-be-2.onrender.com/api/blogs/${blogId}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData)
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to add comment');
                setForm({ fullName: '', email: '', commentText: '' });
                fetchComments(blogId);
            })
            .catch(error => console.error('Error adding comment:', error));
    };

    return (
        <div className="blog-container">
            <a href="./../index.html"><div className="close"><ion-icon name="close-outline"></ion-icon></div></a>
            <div className="blog-box">
                <div className="blog-img">
                    <img src={blog.image} alt={blog.title} className="image" />
                </div>
                <div className="blog-text">
                    <h2>{blog.title}</h2>
                    <p>{blog.content}</p>
                    <div>
                        <ion-icon name="heart-outline" id="heartIcon" onClick={handleLike}></ion-icon>
                        <span id="likesCount">{likes}</span> likes
                    </div>
                    <div className="ii">
                        <h4>Comments</h4>
                        <div className="line"></div>
                    </div>
                    <div className="message">
                        {comments.map((comment, index) => (
                            <div key={index}>
                                <div>{comment.name} <span>{new Date().toLocaleString()}</span></div>
                                <p>{comment.comment}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="comment-form">
                    <form onSubmit={handleCommentSubmit}>
                        <input type="text" value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} placeholder="Enter Full names" />
                        <span id="nameError" className="error" style={{ color: 'red' }}></span>
                        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Enter email" />
                        <span id="emailError" className="error" style={{ color: 'red' }}></span>
                        <input type="text" value={form.commentText} onChange={e => setForm({ ...form, commentText: e.target.value })} placeholder="Add your comment..." />
                        <span id="commentError" className="error" style={{ color: 'red' }}></span>
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </div>
        </div>
    );
}

ReactDOM.render(
    <Provider store={store}>
        <SingleBlog />
    </Provider>,
    document.getElementById('root')
);
