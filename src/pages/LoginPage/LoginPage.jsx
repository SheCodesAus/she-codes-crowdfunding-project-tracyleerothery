import React from "react";


//Components
import LoginForm from "../../components/LoginForm/LoginForm";


function LoginPage() {
    
    return <LoginForm />
}

export default LoginPage;

// <nav class ="navbar"> <a href="{% url 'news:index' %}">Home</a>
      

    
//       {% if request.user.is_authenticated %} 
//           <a href="{% url 'users:profile' pk=request.user.id %}">{{ user.username}}</a>
//           <a href="{% url 'logout' %}">logout</a>
          
//       {% else %}
//           <a href="{% url 'login' %}">login</a>
//           <a href="{% url 'users:createAccount' %}">Create Account</a>
//       {% endif %}
  
     
  
//   </nav> 
  