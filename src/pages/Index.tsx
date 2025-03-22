import React, { useState, useEffect } from 'react';
import SocialPost, { PostProps } from '@/components/SocialPost';
import { Pill } from '@/components/ui/badge';
import { Search } from 'lucide-react';

const socialPosts: PostProps[] = [
  {
    id: '1',
    title: 'Say No to Drugs by Youth',
    description: 'Join our campaign to educate youth about the dangers of drug abuse and addiction. We focus on prevention through education, support for those affected, and creating drug-free community spaces. Our volunteers work closely with schools and youth centers to provide information and resources.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1200&q=80',
    date: 'June 15, 2023',
    likes: 124,
    comments: [
      {
        id: 'c1',
        author: 'Alex Johnson',
        text: 'This is such an important cause. My brother struggled with addiction and these educational programs can really make a difference.',
        date: 'Jun 16'
      },
      {
        id: 'c2',
        author: 'Maria Garcia',
        text: 'I\'m a teacher and would love to bring this program to our school. How can we get involved?',
        date: 'Jun 17'
      }
    ]
  },
  {
    id: '2',
    title: 'Women Safety and Menstrual Health Care',
    description: 'Our initiative focuses on two critical aspects of women\'s wellbeing: personal safety and menstrual health. We provide education, resources, and support systems to empower women, especially in underserved communities. Join us in breaking taboos and creating safer environments for all women.',
    image: 'https://images.unsplash.com/photo-1607748851687-ba2fda4e4ad4?auto=format&fit=crop&w=1200&q=80',
    date: 'May 28, 2023',
    likes: 235,
    comments: [
      {
        id: 'c3',
        author: 'Priya Sharma',
        text: 'Thank you for addressing these important issues! The menstrual health workshops you conducted in rural areas have been transformative.',
        date: 'May 29'
      },
      {
        id: 'c4',
        author: 'David Wilson',
        text: 'My daughter benefited greatly from your safety training program. Every school should implement something similar.',
        date: 'May 30'
      },
      {
        id: 'c5',
        author: 'Sophia Lee',
        text: 'How can we donate menstrual products to your organization? I\'d like to contribute.',
        date: 'Jun 2'
      }
    ]
  },
  {
    id: '3',
    title: 'Tribal Welfare and Education',
    description: 'Supporting indigenous communities through educational initiatives, cultural preservation, and sustainable development projects. Our volunteers work directly with tribal communities to understand their needs and implement collaborative solutions that respect cultural heritage while providing access to modern educational resources.',
    image: 'https://images.unsplash.com/photo-1617196701537-7329482cc9fe?auto=format&fit=crop&w=1200&q=80',
    date: 'April 10, 2023',
    likes: 187,
    comments: [
      {
        id: 'c6',
        author: 'Rajesh Kumar',
        text: 'The work you\'re doing to preserve indigenous languages while providing modern education is amazing. These communities have so much wisdom to share.',
        date: 'Apr 11'
      },
      {
        id: 'c7',
        author: 'Emma Thompson',
        text: 'I\'m a linguistic anthropologist and would love to volunteer with your language preservation programs.',
        date: 'Apr 15'
      }
    ]
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(socialPosts);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Social Cause - Feed';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let filtered = socialPosts;

    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter) {
      filtered = filtered.filter(post => post.title.toLowerCase().includes(activeFilter.toLowerCase()));
    }

    setFilteredPosts(filtered);
  }, [searchTerm, activeFilter]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-in">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium mb-3">
            Social Feed
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Making a difference together</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our initiatives and join the movement for positive social change.
            Support causes that matter and help create a better future for all.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search causes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Pill
              variant={activeFilter === 'drugs' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterClick('drugs')}
            >
              Drug Awareness
            </Pill>
            <Pill
              variant={activeFilter === 'women' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterClick('women')}
            >
              Women's Health
            </Pill>
            <Pill
              variant={activeFilter === 'tribal' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterClick('tribal')}
            >
              Tribal Welfare
            </Pill>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <SocialPost key={post.id} {...post} />
            ))
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg">
              <h3 className="text-lg font-medium mb-2">No posts found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
