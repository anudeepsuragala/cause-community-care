
import React, { useEffect } from 'react';
import ActionButton from '@/components/ActionButton';
import { Heart, DollarSign, Users, Calendar, ExternalLink } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Actions = () => {
  useEffect(() => {
    document.title = 'Social Cause - Action & Funding';
    window.scrollTo(0, 0);
  }, []);

  const causes = [
    {
      id: '1',
      title: 'Youth Drug Prevention Program',
      description: 'Fund educational workshops in schools and community centers to prevent drug abuse among youth.',
      goal: 25000,
      raised: 18750,
      donors: 243,
      daysLeft: 15,
      image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f8e1c1?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '2',
      title: 'Women\'s Health & Safety Initiative',
      description: 'Support women\'s health education and safety training programs in underserved communities.',
      goal: 30000,
      raised: 12600,
      donors: 157,
      daysLeft: 22,
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '3',
      title: 'Tribal Education & Cultural Preservation',
      description: 'Provide educational resources and support cultural preservation projects in tribal communities.',
      goal: 20000,
      raised: 8200,
      donors: 98,
      daysLeft: 30,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const volunteerOpportunities = [
    {
      id: 'v1',
      title: 'Drug Awareness Workshop Facilitator',
      location: 'Various Schools & Community Centers',
      commitment: '4-8 hours per week',
      requirements: 'Teaching experience preferred, training provided'
    },
    {
      id: 'v2',
      title: 'Women\'s Health Education Volunteer',
      location: 'Health Clinics & Community Centers',
      commitment: 'Flexible, 5-10 hours per month',
      requirements: 'Background in healthcare or education preferred'
    },
    {
      id: 'v3',
      title: 'Tribal Community Tutor',
      location: 'Remote & On-site Options',
      commitment: 'Minimum 3 months, 6-10 hours per week',
      requirements: 'Teaching experience, cultural sensitivity'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 animate-fade-in">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-xs font-medium mb-3">
            Action & Funding
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Support Our Causes</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take action by donating to our fundraising campaigns or volunteering your time and skills.
            Together, we can make a meaningful impact.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <DollarSign className="mr-2 h-6 w-6 text-primary" />
            Current Fundraising Campaigns
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {causes.map((cause) => {
              const percentRaised = Math.floor((cause.raised / cause.goal) * 100);
              
              return (
                <div key={cause.id} className="card-glass overflow-hidden">
                  <div className="h-48 bg-muted relative">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-md text-xs font-medium inline-block">
                        {cause.daysLeft} days left
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2">{cause.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{cause.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">${cause.raised.toLocaleString()}</span>
                        <span className="text-muted-foreground">of ${cause.goal.toLocaleString()}</span>
                      </div>
                      <Progress value={percentRaised} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-5">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        <span>{cause.donors} donors</span>
                      </div>
                      <div>{percentRaised}% funded</div>
                    </div>
                    
                    <ActionButton
                      label="Donate Now"
                      icon={<Heart className="w-4 h-4" />}
                      href="#"
                      className="w-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="mr-2 h-6 w-6 text-primary" />
            Volunteer Opportunities
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {volunteerOpportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white border rounded-xl p-6 shadow-soft">
                <h3 className="font-semibold text-lg mb-2">{opportunity.title}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <span className="text-sm font-medium w-28">Location:</span>
                    <span className="text-sm">{opportunity.location}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-sm font-medium w-28">Commitment:</span>
                    <span className="text-sm">{opportunity.commitment}</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-sm font-medium w-28">Requirements:</span>
                    <span className="text-sm">{opportunity.requirements}</span>
                  </div>
                </div>
                
                <ActionButton
                  label="Apply to Volunteer"
                  icon={<Users className="w-4 h-4" />}
                  variant="outline"
                  href="#"
                />
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-muted p-6 rounded-lg text-center">
            <h3 className="text-lg font-medium mb-2">Not finding the right opportunity?</h3>
            <p className="text-muted-foreground mb-4">
              We're always looking for passionate volunteers with diverse skills. 
              Let us know how you'd like to contribute.
            </p>
            <ActionButton
              label="Contact Us About Volunteering"
              icon={<ExternalLink className="w-4 h-4" />}
              variant="secondary"
              href="#"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
