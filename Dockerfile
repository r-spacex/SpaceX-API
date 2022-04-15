FROM rust:1.60.0 AS builder
RUN rustup target add x86_64-unknown-linux-musl
RUN apt update && apt install -y musl-tools musl-dev
RUN update-ca-certificates
ENV USER=appuser
ENV UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    "${USER}"
WORKDIR /ifconfig
COPY ./ .
RUN cargo build --target x86_64-unknown-linux-musl --release

FROM alpine
LABEL maintainer="jakewmeyer@gmail.com"
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group
WORKDIR /ifconfig
COPY --from=builder /ifconfig/target/x86_64-unknown-linux-musl/release/ifconfig ./
USER appuser:appuser
CMD ["/ifconfig/ifconfig"]
