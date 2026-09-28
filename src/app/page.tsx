import { propertyData } from '@/data/propertyData';
import ListingPage from '@/components/listing/ListingPage';

export default function Home() {
  return <ListingPage property={propertyData} />;
}
