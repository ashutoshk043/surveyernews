import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [CommonModule, InfiniteScrollModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  blogs: BlogPost[] = [];
  allBlogs: BlogPost[] = [];
  featuredArticle: BlogPost | null = null;
  trendingItems: TrendingItem[] = [];

  pageSize = 12;
  page = 0;
  isLoading = false;

  ngOnInit(): void {
    this.generateSampleData();
  }

  generateSampleData(): void {
    const categories = ['World', 'Tech', 'Health', 'Sports', 'Politics'];
    const authors = ['Ashutosh', 'Komal', 'Neha', 'Ravi', 'John'];
    const now = new Date();

    for (let i = 1; i <= 100; i++) {
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
      const randomReadTime = Math.floor(Math.random() * 10) + 1;

      const blog: BlogPost = {
        id: i,
        title: `Sample Blog Post ${i}`,
        content: `This is sample content for blog post number ${i}. It is dynamically generated for testing layout and data binding in Angular.`,
        thumbnail: `https://picsum.photos/seed/blog${i}/400/200`,
        category: randomCategory,
        date: new Date(now.getTime() - i * 86400000).toDateString(),
        author: randomAuthor,
        readTime: randomReadTime
      };

      this.allBlogs.push(blog);
    }

    this.featuredArticle = this.allBlogs[0];
    this.loadMore();

    this.trendingItems = this.allBlogs.slice(1, 6).map((blog, index) => ({
      id: blog.id,
      title: blog.title,
      category: blog.category,
      timeAgo: `${index + 1}h ago`,
      rank: index + 1
    }));
  }

  loadMore(): void {
    const next = this.allBlogs.slice(this.page * this.pageSize, (this.page + 1) * this.pageSize);
    this.blogs = [...this.blogs, ...next];
    this.page++;
  }

  onScrollDown(): void {
    if (!this.isLoading && this.blogs.length < this.allBlogs.length) {
      this.loadMore();
    }
  }

  get isAllLoaded(): boolean {
    return this.blogs.length >= this.allBlogs.length;
  }
}
