import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(posts: unknown[], category = ''): any[] {
    if (!category) {
      return posts;
    }

    return posts.filter((post: any) => {
      return post.category.toLowerCase() === category.toLowerCase();
    });
  }
}
