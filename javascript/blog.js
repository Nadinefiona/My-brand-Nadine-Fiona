const { createStore } = Redux;
const { Provider, connect } = ReactRedux;

function blogsReducer(state = [], action) {
    switch (action.type) {
        case 'SET_BLOGS':
            return action.payload;
        default:
            return state;
    }
}

const store = createStore(blogsReducer);

const BlogCard = ({ blog }) => (
    <div className="blog-card" key={blog._id}>
        <img src={blog.image} alt={blog.title} style={{ height: '70%' }} />
        <div className="details">
            {blog.content.substring(0, 110) + (blog.content.length > 110 ? '...' : '')}
        </div>
        <a href={`/Html/singleblog.html?id=${blog._id}`}>Read More</a>
    </div>
);

const ConnectedBlogCard = connect()(BlogCard);

function Blog({ blogs, dispatch }) {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        fetch('https://mybrand-be-2.onrender.com/api/blogs/', { mode: "cors" })
            .then(res => res.json())
            .then(data => {
                dispatch({ type: 'SET_BLOGS', payload: data.data });
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                setIsLoading(false);
            });
    }, [dispatch]);

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" >
                <div className="spinner-border" role="status" style={{ width: '6rem', height: '6rem', marginLeft: '4rem' }}> 
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="blogs-container" >
            {blogs.map(blog => (
                <ConnectedBlogCard key={blog._id} blog={blog} />
            ))}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        blogs: state
    };
};

const ConnectedBlog = connect(mapStateToProps)(Blog);

ReactDOM.render(
    <Provider store={store}>
        <ConnectedBlog />
    </Provider>,
    document.getElementById('blogContainer')
);
