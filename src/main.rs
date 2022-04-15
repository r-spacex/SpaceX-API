#![deny(clippy::all)]

use actix_web::{web::Data, App, HttpServer};
use anyhow::Result;
use sqlx::postgres::PgPoolOptions;
use tracing_actix_web::TracingLogger;

#[tokio::main]
async fn main() -> Result<()> {
    dotenv::dotenv().ok();
    tracing_subscriber::fmt::init();
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let host = std::env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    let port = std::env::var("PORT").unwrap_or_else(|_| "7100".to_string());
    let addr = format!("{}:{}", host, port);

    let pool = PgPoolOptions::new()
        .max_connections(5)
        .connect(&db_url)
        .await?;

    sqlx::migrate!().run(&pool).await?;

    HttpServer::new(move || {
        App::new()
            .app_data(Data::new(pool.clone()))
            .wrap(TracingLogger::default())
            .service(spacex_api_rust::admin::health)
            .service(spacex_api_rust::launches::routes::create_launch)
            .service(spacex_api_rust::launches::routes::read_all_launches)
    })
    .bind(addr)?
    .run()
    .await?;
    Ok(())
}
