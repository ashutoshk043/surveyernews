import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  date: string;
  author: string;
  readTime: number;
  isFeatured?: boolean;
}

interface TrendingItem {
  id: number;
  title: string;
  category: string;
  timeAgo: string;
  rank: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, InfiniteScrollModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  blogs: BlogPost[] = [];
  allBlogs: BlogPost[] = [];
  featuredArticle: BlogPost | null = null;
  trendingItems: TrendingItem[] = [];
  pageSize = 12;
  page = 0;
  isLoading = false;

  // News categories with colors
  categories = [
    { name: 'Technology', color: '#3b82f6', icon: 'fas fa-microchip' },
    { name: 'Business', color: '#dc2626', icon: 'fas fa-chart-line' },
    { name: 'Health', color: '#059669', icon: 'fas fa-heartbeat' },
    { name: 'Sports', color: '#d97706', icon: 'fas fa-trophy' },
    { name: 'Science', color: '#7c3aed', icon: 'fas fa-flask' },
    { name: 'Culture', color: '#ec4899', icon: 'fas fa-palette' },
    { name: 'World', color: '#0891b2', icon: 'fas fa-globe' },
    { name: 'Politics', color: '#7c2d12', icon: 'fas fa-landmark' }
  ];

  // Sample authors
  authors = [
    'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim',
    'Lisa Thompson', 'James Wilson', 'Maria Garcia', 'Robert Davis',
    'Jennifer Lee', 'Alex Brown', 'Sophie Miller', 'Daniel Martinez'
  ];

  // News title templates
  titleTemplates = [
    'Breaking: {topic} Revolutionizes {industry} Industry',
    '{topic} Breakthrough Changes Everything We Know',
    'Major {topic} Development Shakes {industry} Sector',
    'Exclusive: How {topic} is Transforming {industry}',
    'Scientists Discover Revolutionary {topic} Method',
    'Global {industry} Leaders Embrace New {topic} Technology',
    '{topic} Innovation Promises to Reshape {industry}',
    'Unprecedented {topic} Progress in {industry} Field',
    'World Reacts to Groundbreaking {topic} News',
    'Expert Analysis: {topic} Impact on {industry} Future'
  ];

  // Topic and industry combinations
  topics = [
    'AI Technology', 'Climate Change', 'Space Exploration', 'Medical Research',
    'Renewable Energy', 'Cryptocurrency', 'Gene Therapy', 'Quantum Computing',
    'Robotics', 'Blockchain', 'Virtual Reality', 'Biotechnology'
  ];

  industries = [
    'Healthcare', 'Finance', 'Transportation', 'Education', 'Manufacturing',
    'Entertainment', 'Agriculture', 'Energy', 'Communications', 'Defense'
  ];

  constructor() {
    this.initializeData();
    this.loadMore();
  }

  private initializeData(): void {
    // Generate all blog posts
    this.allBlogs = Array.from({ length: 100 }, (_, i) => this.generateBlogPost(i));
    
    // Set featured article (first one)
    this.featuredArticle = {
      ...this.allBlogs[0],
      isFeatured: true,
      title: 'Revolutionary AI Technology Transforms Healthcare Industry Worldwide',
      content: 'Groundbreaking artificial intelligence solutions are reshaping medical diagnostics and patient care, promising unprecedented accuracy and efficiency in healthcare delivery worldwide. This breakthrough represents a significant milestone in the intersection of technology and medicine.',
      thumbnail: 'https://picsum.photos/seed/featured/800/400'
    };

    // Generate trending items
    this.trendingItems = this.generateTrendingItems();
  }

  private generateBlogPost(index: number): BlogPost {
    const category = this.categories[index % this.categories.length];
    const author = this.authors[index % this.authors.length];
    const topic = this.topics[index % this.topics.length];
    const industry = this.industries[index % this.industries.length];
    const template = this.titleTemplates[index % this.titleTemplates.length];
    
    const title = template
      .replace('{topic}', topic)
      .replace('{industry}', industry)
      .replace('{topic}', topic); // Replace second occurrence if exists
    
    return {
      id: index + 1,
      title: title,
      content: this.generateContent(index),
      thumbnail: `https://picsum.photos/seed/blog${index}/400/300`,
      category: category.name,
      date: this.generateDate(index),
      author: author,
      readTime: Math.floor(Math.random() * 8) + 2,
      isFeatured: false
    };
  }

  private generateContent(index: number): string {
    const contentTemplates = [
      'This groundbreaking development promises to reshape our understanding of the field and open new possibilities for future research and applications across multiple sectors.',
      'Industry experts analyze the implications of recent changes and their potential impact on global economic stability and long-term growth prospects.',
      'Innovative solutions continue to emerge, making life more convenient and efficient for millions of people around the world while addressing key challenges.',
      'Researchers have made significant progress in understanding complex systems, leading to breakthrough discoveries that could benefit society.',
      'The latest findings reveal important insights that could significantly improve outcomes and quality of life for people globally.',
      'Environmental scientists report encouraging progress in sustainability efforts and conservation initiatives that will benefit future generations.',
      'Communities worldwide are embracing new approaches that celebrate diversity while fostering unity and shared understanding.',
      'Educational leaders propose comprehensive reforms aimed at improving learning outcomes and creating more inclusive environments.',
      'Business innovators share strategies and insights that help organizations adapt to changing market conditions and consumer needs.',
      'Scientific breakthroughs continue to push the boundaries of human knowledge and understanding of our complex world.'
    ];
    
    return contentTemplates[index % contentTemplates.length];
  }

  private generateDate(index: number): string {
    const now = new Date();
    const hoursAgo = Math.floor(Math.random() * 24) + 1;
    const date = new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000));
    
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    
    return date.toLocaleDateString('en-US', options);
  }

  private generateTrendingItems(): TrendingItem[] {
    const trendingTitles = [
      'Climate Summit Reaches Historic Global Agreement',
      'Tech Giants Report Record Quarterly Earnings',
      'Olympic Games Set New Viewership Records',
      'Space Mission Launches Successfully to Mars',
      'Medical Breakthrough Offers Hope for Patients',
      'Economic Markets Show Strong Recovery Signs'
    ];

    const trendingCategories = ['World', 'Business', 'Sports', 'Science', 'Health', 'Economy'];
    const timeFrames = ['45 min ago', '1 hour ago', '2 hours ago', '3 hours ago', '4 hours ago', '5 hours ago'];

    return trendingTitles.map((title, index) => ({
      id: index + 1,
      title: title,
      category: trendingCategories[index],
      timeAgo: timeFrames[index],
      rank: index + 1
    }));
  }

  loadMore(): void {
    if (this.isLoading || this.blogs.length >= this.allBlogs.length) {
      return;
    }

    this.isLoading = true;

    // Simulate loading delay for better UX
    setTimeout(() => {
      const next = this.allBlogs.slice(
        this.page * this.pageSize, 
        (this.page + 1) * this.pageSize
      );
      
      this.blogs = [...this.blogs, ...next];
      this.page++;
      this.isLoading = false;
    }, 300);
  }

  getCategoryColor(categoryName: string): string {
    const category = this.categories.find(cat => cat.name === categoryName);
    return category ? category.color : '#6b7280';
  }

  getCategoryIcon(categoryName: string): string {
    const category = this.categories.find(cat => cat.name === categoryName);
    return category ? category.icon : 'fas fa-newspaper';
  }

  onScroll(): void {
    this.loadMore();
  }

  onReadMore(blog: BlogPost): void {
    // Handle read more action
    console.log('Reading more about:', blog.title);
    // You can implement navigation to full article here
    // this.router.navigate(['/article', blog.id]);
  }

  onFeaturedClick(): void {
    if (this.featuredArticle) {
      console.log('Featured article clicked:', this.featuredArticle.title);
      // Handle featured article click
    }
  }

  onTrendingClick(item: TrendingItem): void {
    console.log('Trending item clicked:', item.title);
    // Handle trending item click
  }

  trackByBlogId(index: number, blog: BlogPost): number {
    return blog.id;
  }

  trackByTrendingId(index: number, item: TrendingItem): number {
    return item.id;
  }

  // Utility method to get time ago format
  getTimeAgo(date: string): string {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date;
  }

  // Method to handle infinite scroll
  onScrollDown(): void {
    this.loadMore();
  }

  // Check if all articles are loaded
  get isAllLoaded(): boolean {
    return this.blogs.length >= this.allBlogs.length;
  }

  // Get loading state for UI
  get showLoadingState(): boolean {
    return this.isLoading;
  }
}