'use strict'

const { validate } = use('Validator') // Used to validate the form
const Hash = use('Hash') // Used to hash password input. Hashed values cannot be decrypted.
const User = use('App/Models/User') // Bringing in the User Model table data for the relevant user. 

class AuthController {
    // Directs user to the registration page
    async register({response, request, view}) {
        return view.render('auth/register')
    }
    async storeUser ({ request, session, response, auth }) {

        // Validation rules
        const validation = await validate(request.all(), {
            email: 'required|email|unique:users,email',
            password: 'required|min:6|max:40',
            confirm_password: 'required'
        })
        

        // Check if passwords match
        if( request.input('password') ==  request.input('confirm_password')) {

            // Check if it fails validation
            if (validation.fails()) {
                    session
                    .withErrors(validation.messages())
                    .flashExcept(['password'])
        
                    return response.redirect('back')
                } else {
                    // Save user to database
                    try {
                        let newUser = await User.create({
                        email:request.input('email'),
                        password: request.input('password')
                        })
                    } catch(error) {
                        // Show errors if problems with database
                        console.log('error')
                        session
                            .withErrors([
                                {field: 'database', message: 'problem with database try later'},
                            ])
                            .flashExcept(['password'])

                        return response.redirect('back')
                    }
                    
                    // Store a flash success notification and redirect to the homepage.
                    session.flash({notification: 'Welcome to GabReel'})
                    return response.redirect('/')
                }                
        } else {
            // Show errors if password doesn't match
            session
                .withErrors([
                    {field: 'password', message: 'need to confirm password'},
                    {field: 'confirm_password', message: 'need to confirm password'}
                ])
                .flashExcept(['password'])

            return response.redirect('back')
            // return `passwords don't match`
        }

        
    }

    // Direct user to the login page
    async login({response, request, view}) {
        return view.render('auth/login')
    }
    
    async loginUser({response, request, view, auth, session}) {
        // Capture the data from the form
        const postData = request.post()

        // Find the user in the database by their email
        const user = await User.query().where('email', postData.email).first()
        
        if(user) {
            // Verify the password
            const passwordVerified = await Hash.verify(postData.password, user.password)
                    
            if(passwordVerified) {
                // Login the user
                await auth.login(user)
                // Flash message to be displayed if the user is successfully logged in
                session.flash({notification: 'Welcome to GabReel'})
                return response.redirect('/')
            } else {
                // Password incorrect
                session
                .withErrors([
                    {field: 'password', message: `Incorrect Password`},
                ])
                .flashExcept(['password'])

                return response.redirect('back')
            }
        } else {
            // Can't find user with that email
            session
                .withErrors([
                    {field: 'email', message: `Can't find user with that email`},
                ])
                .flashExcept(['password'])

            return response.redirect('back')
        }

    }

    // Direct user to password recovery page
    async forgotPassword({response, request, view}) {
        return view.render('auth/forgotPassword')
    }

    // Direct user to root when logging out
    async logout({response, request, view, auth}) {
        try {
            await auth.logout()
            return response.redirect('/')
        } catch (error) {
            console.log(error)
            return 'Error could not logout'
        }
        
    }
}

module.exports = AuthController
