import SectionHeading from "@/components/ui/SectionHeading";
import ShapesBackground from "@/components/ui/ShapesBackground";
import { useCMS } from "@/contexts/CMSContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Heart, Users, Award, Coffee, Globe, Gift, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getPayload } from 'payload';
import config from '@payload-config';

const Ministries = async () => {
  // const { ministries } = useCMS();
  const payload = await getPayload({
    config
  });

  const ministries = await payload.find({
    collection: 'ministries',
    sort: "id"
  });


  
  // Helper function to render the correct icon
  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      Users: <Users className="h-6 w-6" />,
      Music: <Music className="h-6 w-6" />,
      BookOpen: <BookOpen className="h-6 w-6" />,
      Heart: <Heart className="h-6 w-6" />,
      Award: <Award className="h-6 w-6" />,
      Coffee: <Coffee className="h-6 w-6" />,
      Globe: <Globe className="h-6 w-6" />,
      Gift: <Gift className="h-6 w-6" />,
      MessageCircle: <MessageCircle className="h-6 w-6" />,
    };
    
    return iconMap[iconName] || <Users className="h-6 w-6" />;
  };

  // Function to get a background image based on the ministry type
  const getMinistryBackground = (title: string) => {
    const imageMap: Record<string, string> = {
      "Youth Ministry": "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb",
      "Choir & Music": "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4",
      "Sunday School": "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      "Charity & Outreach": "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
      "Catechism": "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
    };
    
    return imageMap[title] || "https://images.unsplash.com/photo-1466442929976-97f336a657be";
  };

  return (
    <>
      <div className="pt-28 pb-16 md:pt-32 md:pb-20 px-4 relative">
        <ShapesBackground />
        <div className="container mx-auto relative z-10">
          <SectionHeading 
            title="Pious Associations"
            subtitle="Discover how you can get involved and serve in our parish community."
          />
          
          {/* Ministries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {ministries.docs.map((ministry, index) => (
              <Card key={index} className={`overflow-hidden animate-fade-in animate-delay-${index % 3 * 100}`}>
                <div className="relative h-40">
                  <img 
                    src={`${getMinistryBackground(ministry.name)}?w=400&h=200&fit=crop&auto=format`}
                    alt={ministry.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{ministry.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{ministry.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="max-w-3xl mx-auto mt-16">
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">Get Involved</h2>
              <p className="mb-4">
                Whether you&apos;re interested in serving, sharing your talents, or growing in faith, there&apos;s a place for you in our parish community. 
                Contact us to learn more about these ministries or to get involved.
              </p>
              <p>
                &quot;As each one has received a gift, use it to serve one another as good stewards of God&apos;s varied grace.&quot; - 1 Peter 4:10
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ministries;
