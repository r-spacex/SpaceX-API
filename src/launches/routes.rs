use actix_web::{web, HttpResponse, Responder, post, get};
use sqlx::{Pool, Postgres};

use super::model::Launch;

#[post("/launches")]
pub async fn create_launch(
    pool: web::Data<Pool<Postgres>>,
    launch: web::Json<Launch>,
) -> impl Responder {
    let value = Launch::create(&pool, &launch).await;
    match value {
        Ok(launch) => HttpResponse::Ok().json(launch),
        Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
    }
}

#[get("/launches")]
pub async fn read_all_launches(pool: web::Data<Pool<Postgres>>) -> impl Responder {
    let value = Launch::read_all(&pool).await;
    match value {
        Ok(launches) => HttpResponse::Ok().json(launches),
        Err(err) => HttpResponse::InternalServerError().json(err.to_string()),
    }
}
