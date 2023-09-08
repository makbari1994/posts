import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPost } from '../models/post-model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    constructor(private http: HttpClient) { }
    ///declare base url
    url = "https://my-json-server.typicode.com/makbari1994/inpress/posts";
    /// get all post api
    getAllPosts(): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.url);
    }
    /// create post api
    createPost(post: IPost): Observable<IPost> {
        return this.http.post<IPost>(this.url, post);
    }
    /// get post by id api
    getPostById(id: string): Observable<IPost[]> {
        return this.http.get<IPost[]>(this.url + '?id=' + id);
    }

    /// filter by title and audit api
    filterPosts(title: string, author: string): Observable<IPost[]> {
        let url = this.url;
        if (title) {
            url += `?title=${title.trim()}`;
        }
        if (author) {
            url += `${title ? '&' : '?'}author=${author.trim()}`
        }
        return this.http.get<IPost[]>(url);
    }



} 