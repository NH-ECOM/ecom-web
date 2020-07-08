-- public.user_role definition

-- Drop table

-- DROP TABLE public.user_role;

CREATE TABLE public.user_role (
	id serial NOT NULL,
	user_role_name varchar(50) NOT NULL,
	user_role_desc varchar(200) NULL DEFAULT NULL::character varying,
	created_on timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	modified_on timestamp NULL,
	CONSTRAINT user_role_pkey PRIMARY KEY (id),
	CONSTRAINT user_role_user_role_name_key UNIQUE (user_role_name)
);



-- public.files definition

-- Drop table

-- DROP TABLE public.files;

CREATE TABLE public.files (
	id serial NOT NULL,
	file_name varchar(100) NOT NULL,
	file_data bytea NOT NULL,
	created_on timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	modified_on timestamp NULL,
	CONSTRAINT files_pkey PRIMARY KEY (id)
);



-- public.users definition

-- Drop table

-- DROP TABLE public.users;

CREATE TABLE public.users (
	id serial NOT NULL,
	user_name varchar(50) NOT NULL,
	user_pass varchar(50) NOT NULL,
	user_account_name varchar(100) NOT NULL,
	user_role_id int4 NOT NULL,
	user_address varchar NULL,
	user_mobile_number int8 NULL,
	user_monthly_target int4 NULL,
	file_id int4 NULL,
	pass_expiry_on timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	created_on timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	modified_on timestamp NULL,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);


-- public.users foreign keys

ALTER TABLE public.users ADD CONSTRAINT user_file_fkey FOREIGN KEY (file_id) REFERENCES files(id);
ALTER TABLE public.users ADD CONSTRAINT user_role_fkey FOREIGN KEY (user_role_id) REFERENCES user_role(id);



-- public.product_category definition

-- Drop table

-- DROP TABLE public.product_category;

CREATE TABLE public.product_category (
	id serial NOT NULL,
	product_category_name varchar(50) NOT NULL,
	product_category_desc varchar(500) NULL DEFAULT NULL::character varying,
	created_on timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	modified_on timestamp NULL,
	status bool NOT NULL DEFAULT false,
	category_code varchar(200) NOT NULL DEFAULT ''::character varying,
	CONSTRAINT product_category_pkey PRIMARY KEY (id),
	CONSTRAINT product_category_ukey UNIQUE (product_category_name)
);



-- public.product definition

-- Drop table

-- DROP TABLE public.product;

CREATE TABLE public.product (
	id serial NOT NULL,
	product_name varchar(200) NOT NULL,
	product_desc varchar(1000) NOT NULL,
	price float4 NOT NULL DEFAULT 0,
	gst_rate int4 NOT NULL DEFAULT 0,
	discount_rate int4 NOT NULL DEFAULT 0,
	status bool NOT NULL DEFAULT false,
	available_stock int4 NOT NULL DEFAULT 0,
	product_category_id int8 NOT NULL DEFAULT 0,
	product_code varchar(200) NOT NULL DEFAULT ''::character varying,
	offers varchar(1000) NOT NULL,
	file_id int4 NULL,
	net_price float8 NOT NULL DEFAULT 0.0,
	created_on timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	modified_on timestamp NULL,
	CONSTRAINT product_pkey PRIMARY KEY (id)
);


-- public.product foreign keys

ALTER TABLE public.product ADD CONSTRAINT product_category_fkey FOREIGN KEY (product_category_id) REFERENCES product_category(id);
ALTER TABLE public.product ADD CONSTRAINT product_file_fkey FOREIGN KEY (file_id) REFERENCES files(id);



-- public.orders_header definition

-- Drop table

-- DROP TABLE public.orders_header;

CREATE TABLE public.orders_header (
	id serial NOT NULL,
	order_price float4 NOT NULL DEFAULT 0,
	order_gst_amount float4 NOT NULL DEFAULT 0,
	customer_id int8 NOT NULL DEFAULT 0,
	status varchar(50) NULL DEFAULT 'RAISED'::character varying,
	created_by int8 NOT NULL DEFAULT 0,
	created_on timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	modified_on timestamp NULL,
	approved_on timestamp NULL,
	dispatched_on timestamp NULL,
	CONSTRAINT orders_header_pkey PRIMARY KEY (id)
);



-- public.orders_header foreign keys

ALTER TABLE public.orders_header ADD CONSTRAINT fkahfaxnfap1c6inpwj0k4mwmmg FOREIGN KEY (created_by) REFERENCES users(id);
ALTER TABLE public.orders_header ADD CONSTRAINT fkay5gpo3bxa4eawmfairi8rjmo FOREIGN KEY (customer_id) REFERENCES users(id);


-- public.orders_details definition

-- Drop table

-- DROP TABLE public.orders_details;

CREATE TABLE public.orders_details (
	id serial NOT NULL,
	order_id int8 NOT NULL DEFAULT 0,
	product_id int8 NOT NULL DEFAULT 0,
	product_price float4 NOT NULL DEFAULT 0,
	gst_rate int4 NOT NULL DEFAULT 0,
	product_quantity int4 NOT NULL DEFAULT 0,
	CONSTRAINT orders_details_pkey PRIMARY KEY (id)
);


-- public.orders_details foreign keys

ALTER TABLE public.orders_details ADD CONSTRAINT orders_details_fk FOREIGN KEY (order_id) REFERENCES orders_header(id);
ALTER TABLE public.orders_details ADD CONSTRAINT orders_details_product_fk FOREIGN KEY (product_id) REFERENCES product(id);

