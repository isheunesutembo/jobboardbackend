const express=require('express')
const rateLimit=require('express-rate-limit')

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  });
  
  // Login route limiter (more restrictive)
  const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 login attempts per hour
    message: 'Too many login attempts, please try again later'
  });

  module.exports={ 
    apiLimiter,
    loginLimiter
  }