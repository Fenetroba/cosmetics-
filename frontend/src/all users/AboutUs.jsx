import React from 'react'
import { Button } from '../Components/ui/button'
import { Link } from 'react-router-dom'
import { Users, Award, Heart, Sparkles } from 'lucide-react'
import Header from './Header'

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Michael Chen",
      role: "Head of Product",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    {
      name: "Emma Rodriguez",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Quality First",
      description: "We never compromise on the quality of our products, ensuring the best for our customers."
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Innovation",
      description: "Constantly pushing boundaries to bring you the latest in beauty and skincare technology."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We listen and adapt to your needs."
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description: "Striving for excellence in everything we do, from product development to customer service."
    }
  ];

  return (
    <section><Header/>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Our Beauty Journey
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We're passionate about bringing you the finest beauty products that enhance your natural beauty
              while maintaining the highest standards of quality and sustainability.
            </p>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/products">Explore Our Products</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Cosmetics, we believe that everyone deserves to feel confident and beautiful in their own skin.
                Our mission is to provide high-quality, sustainable beauty products that empower individuals to
                express their unique style while caring for their skin and the environment.
              </p>
              <p className="text-gray-600">
                We're committed to using natural ingredients, sustainable packaging, and ethical manufacturing
                processes to create products that you can feel good about using.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
                <div className="mb-4 flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Beauty Journey</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience the difference of premium beauty products crafted with care and passion.
            Start your journey to natural beauty today.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild>
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </section>
  )
}

export default AboutUs