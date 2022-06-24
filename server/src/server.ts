// import hello from '@utils/hello'
// hello()

import App from '@/app'
import IndexRoute from '@routes/index.route'
import UsersRoute from '@routes/users.route'
import PostsRoute from '@routes/posts.route'
import AuthRoute from '@routes/auth.route'
import validateEnv from '@utils/validateEnv'

validateEnv()

const app = new App([new IndexRoute, new AuthRoute, new UsersRoute, new PostsRoute])

app.listen()
