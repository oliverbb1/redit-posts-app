const posts = document.querySelector(".posts");
const searchUser = document.querySelector('#search');
const getPosts = document.querySelector('.getPosts');
const ascending = document.getElementById('asc')
const descending = document.getElementById('dsc')
let users = [];

const fetchPost = () => {
    fetch("https://www.reddit.com/r/javascript.json")
        .then(res => { res.json()
        .then(res => {
            users = res.data.children;
            showUsers(users)
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}


const showUsers = (arr) => {
    let output = '';

arr.forEach(({ data: { title, url } }) => {output += `<div>
    <a class="every-post" href=${url}>${title}<a/>
</div>`});
posts.innerHTML = output;
}

getPosts.addEventListener("click", fetchPost);

searchUser.addEventListener('input', e => {
const element = e.target.value.toLowerCase();
const newUser = users
    .filter(user => user.data.title
    .toLowerCase()
    .includes(element))
    showUsers(newUser)
});

const ascendingPosts = () => {
    const ascPost = users.sort((a, b) => a.data.created - b.data.created)
    showUsers(ascPost)
}
const descendingPosts = () => {
    console.log(users)
    const descPost = users.sort((a, b) => b.data.created - a.data.created)
    showUsers(descPost)
}

ascending.addEventListener('click', ascendingPosts)
descending.addEventListener('click', descendingPosts)
