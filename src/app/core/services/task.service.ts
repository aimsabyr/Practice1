import { Injectable } from '@angular/core';

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  query,
where
} from 'firebase/firestore';

import { FirebaseService } from './firebase.service';
import { Task } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private firebase: FirebaseService
  ) {}

  // Add Task
  addTask(task: Task) {
    const taskCollection = collection(
      this.firebase.firestore,
      'tasks'
    );

    return addDoc(taskCollection, task);
  }

  // Get Tasks
  getTasks() {
    return getDocs(
      collection(this.firebase.firestore, 'tasks')
    );
  }

  // Update Task
  updateTask(id: string, task: Partial<Task>) {
    const taskDoc = doc(
      this.firebase.firestore,
      'tasks',
      id
    );

    return updateDoc(taskDoc, task);
  }

  // Delete Task
  deleteTask(id: string) {
    const taskDoc = doc(
      this.firebase.firestore,
      'tasks',
      id
    );

    return deleteDoc(taskDoc);
  }
  // Get one task
getTask(id: string) {

  const taskDoc = doc(
    this.firebase.firestore,
    'tasks',
    id
  );

  return getDoc(taskDoc);

}
getUserTasks(userId: string) {

  const taskCollection = collection(
    this.firebase.firestore,
    'tasks'
  );

  const q = query(
    taskCollection,
    where('userId', '==', userId)
  );

  return getDocs(q);

}
// Dashboard statistics
async getStatistics(userId: string) {

  const snapshot = await this.getUserTasks(userId);

  const tasks = snapshot.docs.map(doc => doc.data() as Task);

  return {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'done').length,
    pending: tasks.filter(task => task.status !== 'done').length
  };

}

}