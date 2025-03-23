
import React, { useState, useEffect } from 'react';
import SocialPost, { PostProps } from '@/components/SocialPost';
import { Pill } from '@/components/ui/badge';
import { Search, Video, FileText, MessageSquare, Presentation } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContentLibraryItem from '@/components/ContentLibraryItem';

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

// Content Library Data
const contentLibrary = {
  videos: [
    {
      id: 'v1',
      title: 'Understanding Drug Addiction',
      thumbnail: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      duration: '14:35',
      author: 'Health Education Channel',
      date: 'Aug 12, 2023',
      category: 'drugs'
    },
    {
      id: 'v2',
      title: 'Women\'s Safety: Self-Defense Basics',
      thumbnail: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=800&q=80',
      duration: '22:14',
      author: 'Safety First Initiative',
      date: 'Jul 28, 2023',
      category: 'women'
    },
    {
      id: 'v3',
      title: 'Tribal Education: Challenges & Solutions',
      thumbnail: 'https://images.unsplash.com/photo-1544476915-ed1370594142?auto=format&fit=crop&w=800&q=80',
      duration: '18:42',
      author: 'Education For All',
      date: 'Sep 5, 2023',
      category: 'tribal'
    }
  ],
  tedTalks: [
    {
      id: 't1',
      title: 'How We Can End Youth Drug Abuse',
      thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
      speaker: 'Dr. Michael Rodriguez',
      date: 'May 30, 2023',
      duration: '17:22',
      category: 'drugs'
    },
    {
      id: 't2',
      title: 'Breaking Menstrual Taboos',
      thumbnail: 'https://images.unsplash.com/photo-1561654791-00316c79efa8?auto=format&fit=crop&w=800&q=80',
      speaker: 'Priya Sharma',
      date: 'Apr 15, 2023',
      duration: '12:48',
      category: 'women'
    },
    {
      id: 't3',
      title: 'Indigenous Knowledge: The Forgotten Wisdom',
      thumbnail: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?auto=format&fit=crop&w=800&q=80',
      speaker: 'James Running Bear',
      date: 'Jun 8, 2023',
      duration: '19:05',
      category: 'tribal'
    }
  ],
  articles: [
    {
      id: 'a1',
      title: 'The Impact of Drug Prevention Programs in Schools',
      thumbnail: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80',
      author: 'Emily Johnson, PhD',
      readTime: '8 min read',
      date: 'Jul 14, 2023',
      category: 'drugs'
    },
    {
      id: 'a2',
      title: 'Accessible Menstrual Health: A Global Challenge',
      thumbnail: 'https://images.unsplash.com/photo-1591522810850-58827fec5f28?auto=format&fit=crop&w=800&q=80',
      author: 'Sarah Williams, MD',
      readTime: '12 min read',
      date: 'Aug 22, 2023',
      category: 'women'
    },
    {
      id: 'a3',
      title: 'Preserving Tribal Languages in the Digital Age',
      thumbnail: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=80',
      author: 'Dr. Robert Thompson',
      readTime: '10 min read',
      date: 'Sep 15, 2023',
      category: 'tribal'
    }
  ],
  posts: [
    {
      id: 'p1',
      title: 'Community Drug Awareness Campaign Results',
      thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      author: 'Drug-Free Youth Coalition',
      date: 'Aug 30, 2023',
      excerpt: 'Our recent awareness campaign reached over 5,000 young people across 15 schools...',
      category: 'drugs'
    },
    {
      id: 'p2',
      title: 'Women\'s Safety Workshop Success',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
      author: 'Women\'s Safety Initiative',
      date: 'Jul 18, 2023',
      excerpt: 'The recent self-defense workshop saw participation from over 200 women from various age groups...',
      category: 'women'
    },
    {
      id: 'p3',
      title: 'New Education Center Opens in Tribal Region',
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      author: 'Tribal Education Fund',
      date: 'Sep 12, 2023',
      excerpt: 'A new education center equipped with modern facilities has been opened in the remote tribal region of...',
      category: 'tribal'
    }
  ]
};

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<PostProps[]>(socialPosts);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeContentTab, setActiveContentTab] = useState('videos');
  const [filteredContent, setFilteredContent] = useState(contentLibrary.videos);

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

    // Filter content library based on search term and active filter
    const contentType = activeContentTab as keyof typeof contentLibrary;
    let filteredContentItems = contentLibrary[contentType];
    
    if (searchTerm) {
      filteredContentItems = filteredContentItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeFilter) {
      filteredContentItems = filteredContentItems.filter(item => 
        item.category === activeFilter.toLowerCase()
      );
    }
    
    setFilteredContent(filteredContentItems);
  }, [searchTerm, activeFilter, activeContentTab]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const handleContentTabChange = (value: string) => {
    setActiveContentTab(value);
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

        {/* Content Library Section */}
        <div className="mb-12 bg-muted/30 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Content Library</h2>
          
          <Tabs defaultValue="videos" value={activeContentTab} onValueChange={handleContentTabChange}>
            <TabsList className="mb-6">
              <TabsTrigger value="videos" className="flex items-center gap-2">
                <Video className="w-4 h-4" /> Videos
              </TabsTrigger>
              <TabsTrigger value="tedTalks" className="flex items-center gap-2">
                <Presentation className="w-4 h-4" /> TED Talks
              </TabsTrigger>
              <TabsTrigger value="articles" className="flex items-center gap-2">
                <FileText className="w-4 h-4" /> Articles
              </TabsTrigger>
              <TabsTrigger value="posts" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" /> Posts
              </TabsTrigger>
            </TabsList>
            
            {Object.keys(contentLibrary).map((contentType) => (
              <TabsContent key={contentType} value={contentType}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredContent.length > 0 ? (
                    filteredContent.map((item) => (
                      <ContentLibraryItem 
                        key={item.id} 
                        item={item} 
                        type={activeContentTab}
                      />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <p className="text-muted-foreground">
                        No {activeContentTab} found matching your criteria.
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
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
