import request from 'supertest';
import app from '../app.js';
import { TrainStationModel } from '../models/TrainStationModel.js';
import { describe, it, expect, beforeEach } from 'vitest';

  describe('GET /trainstation', () => {
    it('list train station', async () => {

      const response = await request(app).get('/trainstation');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });

  });

  describe('GET /trainstation/:id', () => {
    it('list train station with id', async () => {

      const trainStation = await TrainStationModel.create({
        name: 'Test Station',
        open_hour: '08:00',
        close_hour: '18:00',
        image: 'test.jpg',
      });

      const response = await request(app).get(`/trainstation/${trainStation._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(trainStation.toJSON());
    });
  });

  describe('POST /trainstation', () => {
    it('create trainstation', async () => {
      const newTrainStation = {
        name: 'New Station',
        open_hour: '09:00',
        close_hour: '19:00',
        image: 'new.jpg',
      };

      const response = await request(app).post('/trainstation').send(newTrainStation);

      expect(response.status).toEqual(401);
      expect(response.body).toMatchObject(newTrainStation);
    });
  });

  describe('PUT /trainstation/:id', () => {
    it(' update train station', async () => {

      const trainStation = await TrainStationModel.create({
        name: 'Test Station',
        open_hour: '08:00',
        close_hour: '18:00',
        image: 'test.jpg',
      });

      const updatedTrainStation = {
        name: 'Updated Station',
        open_hour: '09:00',
        close_hour: '19:00',
        image: 'updated.jpg',
      };

      const response = await request(app)
        .put(`/trainstation/${trainStation._id}`)
        .send(updatedTrainStation);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(updatedTrainStation);
    });
  });

  describe('DELETE /trainstation/:id', () => {
    it('delete train station with train', async () => {

      const trainStation = await TrainStationModel.create({
        name: 'Test Station',
        open_hour: '08:00',
        close_hour: '18:00',
        image: 'test.jpg',
      });

      const response = await request(app).delete(`/trainstation/${trainStation._id}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: 'Train station and train deleted' });
    });

  });