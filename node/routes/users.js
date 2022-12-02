var express = require('express');
var router = express.Router();
const Joi = require('joi');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../models/User');
const Invit = require('../models/Invit');

///

//validation
const schemavalidation = Joi.object({
  username: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .min(7)
    .max(30)
    .required(),
  confirm_password: Joi.ref('password'),
})


//fonction middleware
var privateKey = process.env.PRIVATEKEY
verifytoken = (req, res, next) => {
  let token = req.headers.authorization
  if (!token) {
    res.status(409).json({
      msg: 'access rejected ..!!'
    })
  }
  try {
    jwt.verify(token, privateKey)
    next()
  } catch (e) {
    res.status(404).json({
      msg: e
    })
  }
}

const schemavalidationSignin = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .min(7)
    .max(30)
    .required(),
})

//sign in
router.post('/signin', (req, res, next) => {
  let validation = schemavalidation.validate({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirm_password
  })

  if (validation.error) {
    return res.status(404).json({
      message: validation.error.details[0].message
    })
  } else {
    User.find({ email: req.body.email }).then(user => {
      if (user.length >= 1) {
        bcrypt.compare(req.body.password, user[0].password).then(result => {
          if (result) {

            let token = jwt.sign({
              id: user[0]._id,
              email: req.body.email,
              username: req.body.username
            }, privateKey, {
              expiresIn: '1h',
            })

            res.status(200).json({
              message: token, user
            })
          } else {
            res.status(409).json({
              message: 'wrong data '
            })
          }
        }).catch(err => {
          res.status(404).json({
            message: err
          })
        })
      } else {
        res.status(409).json({
          message: 'wrong data'
        })
      }
    }).catch(err => {
      res.status(404).json({
        message: err
      })
    }

    )
  }
})

//get all user
secretkey = "secretkey"
clientkey = "adminkey"

verifysecretkey = (req, res, next) => {
  let sk = req.params.secret
  let ck = req.params.client
  if (sk == secretkey && ck == clientkey) {
    next()
  } else {
    res.status(404).json({
      error: "you can't access to this route because you don't sent me secret key znd client key"
    })
  }

}

router.get('/getuserss/:secret/:client', verifysecretkey, (req, res, next) => {

  let token = req.headers.authorization
  let userConnecte = jwt.decode(token, { complete: true })
  User.find().then(doc => {
    res.status(200).json({
      message: {
        User_Connect: userConnecte,
        Users: doc
      }
    })
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })

})

//get invits
router.get('/getinvits/:secret/:client', verifysecretkey, (req, res, next) => {

  let token = req.headers.authorization
  let userConnecte = jwt.decode(token, { complete: true })
  Invit.find().then(doc => {
    res.status(200).json({
      message: {
        User_Connect: userConnecte,
        Invitasions: doc
      }
    })
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })

})

//update
router.patch('/updateuser/:id',(req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const newuser = {
      username: req.body.username,
      password: hash,
    }

    User.findOneAndUpdate({ _id: req.params.id }, { $set: newuser }).then(result => {
      if (result) {
        res.status(202).json({
          message: 'user ubdated'
        })
      } else {
        res.status(409).json({
          message: 'user not found'
        })
      }

    }).catch(err => {
      res.status(404).json({
        message: err
      })
    })
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })

})

//delete
router.delete('/deleteuser/:secret/:client/:id', (req, res, next) => {
  
  User.findOneAndDelete({ _id: req.params.id }).then(result => {
    if (result) {
      res.status(202).json({
        message: 'user deleted'
      })
    } else {
      res.status(409).json({
        message: 'user not found'
      })
    }

  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })
})

//update with email & password
const SchemaValidationUpdate = Joi.object({
  newusername: Joi.string()
    .min(3)
    .max(30)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  oldpassword: Joi.string()
    .min(7)
    .max(30)
    .required(),
  newpassword: Joi.string()
    .min(7)
    .max(30)
    .required(),
  confirm_password: Joi.ref('newpassword'),
})

router.put('/update/:email/:oldpassword' , (req, res, next) => {

  let validation = SchemaValidationUpdate.validate({
    newusername: req.body.newusername,
    email: req.params.email,
    oldpassword: req.params.oldpassword,
    newpassword: req.body.newpassword,
    confirm_password: req.body.confirm_password
  })

  if (validation.error) {
    return res.status(404).json({
      message: validation.error.details[0].message
    })
  } else {

    User.find({ email: req.params.email }).then(user => {
      if (user.length >= 1) {
        bcrypt.compare(req.params.oldpassword, user[0].password).then(result => {
          if (result) {
            bcrypt.hash(req.body.newpassword, 10).then(hash => {
              const newuser = {
                username: req.body.newusername,
                password: hash,
              }
              User.findOneAndUpdate({ email: req.params.email }, { $set: newuser }).then(resultt => {
                if (resultt) {
                  res.status(202).json({
                    message: 'user ubdated', newuser
                  })
                } else {
                  res.status(409).json({
                    message: 'not updated'
                  })
                }
              })
            })

          } else {
            res.status(409).json({
              message: 'wrong password '
            })
          }
        }).catch(err => {
          res.status(404).json({
            message: err
          })
        })
      } else {
        res.status(409).json({
          message: 'wrong email'
        })
      }
    }).catch(err => {
      res.status(404).json({
        message: err
      })
    }

    )
  }
})


//signup
router.post('/signup', (req, res, next) => {

  let validation = schemavalidation.validate({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    confirm_password: req.body.confirm_password
  })

  if (validation.error) {
    return res.status(404).json({
      message: validation.error.details[0].message
    })
  } else {

    User.find({ email: req.body.email }).then(
      result => {

        if (result.length < 1) {

          Invit.find({ email: req.body.email }).then(
            result => {
              if (result.length < 1) {

          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              res.status(404).json({
                message: err
              })
            } else {

              const invit = new Invit({
                username: req.body.username,
                email: req.body.email,
                password: hash
              })

              invit.save().then(result => {
                console.log(result)
                res.status(202).json({
                  message: 'invit added'
                })
              }).catch(err => {
                res.status(404).json({
                  message: err
                })
              })

            }
          })
        }else {
          res.status(409).json({
            message: 'this email already exist'
          })
        }
      }).catch(err => {
        res.status(404).json({
          message: err
        })
      })
        
    }else {
          res.status(409).json({
            message: 'this email already exist'
          })
        }
      
      }).catch(err => {
      res.status(404).json({
        message: err
      })
    })
  }
})


//accept
router.get('/accept/:secret/:client/:id', (req, res, next) => {
  
    Invit.find({ _id: req.params.id  }).then(
      result => {
if(result.length >= 1){

  const user = new User({
    _id : result[0]._id ,
    username:  result[0].username,
    email: result[0].email,
    password: result[0].password
  })
  
  user.save().then(result => {
    console.log(result)
    res.status(202).json({
      message: 'user accepted'
    })
  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })

}else{
  res.status(202).json({
    message: 'invalid email'
  })
}
      }).catch(err => {
      res.status(404).json({
        message: err
      })
    })

})

//remove
router.delete('/remove/:secret/:client/:id', (req, res, next) => {
  Invit.findOneAndDelete({ _id: req.params.id }).then(result => {
    if (result) {
      res.status(202).json({
        message: 'user deleted'
      })
    } else {
      res.status(409).json({
        message: 'user not found'
      })
    }

  }).catch(err => {
    res.status(404).json({
      message: err
    })
  })
})






















module.exports = router;