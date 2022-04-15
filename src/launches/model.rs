use anyhow::Result;
use serde::{Deserialize, Serialize};
use sqlx::{types::Uuid, FromRow, Pool, Postgres};

#[derive(Debug, FromRow, Deserialize, Serialize)]
pub struct Launch {
    pub id: Uuid,
    pub flight_number: i16,
    pub name: String,
    pub rocket: Option<Uuid>,
}

impl Launch {
    pub async fn create(pool: &Pool<Postgres>, launch: &Launch) -> Result<Launch> {
        let created = Launch {
            id: Uuid::new_v4(),
            flight_number: launch.flight_number,
            name: launch.name.clone(),
            rocket: launch.rocket,
        };
        sqlx::query!(
            "INSERT INTO launches (id, flight_number, name, rocket) VALUES ($1, $2, $3, $4);",
            created.id,
            created.flight_number,
            created.name,
            created.rocket
        )
        .execute(pool)
        .await?;
        Ok(created)
    }

    pub async fn read_all(pool: &Pool<Postgres>) -> Result<Vec<Launch>> {
        let rows = sqlx::query_as!(
            Launch,
            "SELECT id, flight_number, name, rocket FROM launches;"
        )
        .fetch_all(pool)
        .await?;
        Ok(rows)
    }
}
