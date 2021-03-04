--------------------------------------------------------
-- Archivo creado  - jueves-marzo-04-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table CLIENTES
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."CLIENTES" 
   (	"ID_CLIENTE" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"NOMBRE_1" VARCHAR2(20 BYTE), 
	"NOMBRE_2" VARCHAR2(20 BYTE), 
	"APELLIDO_1" VARCHAR2(20 BYTE), 
	"APELLIDO_2" VARCHAR2(20 BYTE), 
	"TIPO_DOC" VARCHAR2(20 BYTE), 
	"DOCUMENTO" VARCHAR2(20 BYTE), 
	"CELULAR" VARCHAR2(20 BYTE), 
	"DIRECCION" VARCHAR2(50 BYTE), 
	"CORREO" VARCHAR2(50 BYTE), 
	"ESTADO" VARCHAR2(20 BYTE), 
	"CREADO_EL" DATE, 
	"ID_TIENDA" NUMBER
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into SYSTEM.CLIENTES
SET DEFINE OFF;
Insert into SYSTEM.CLIENTES (ID_CLIENTE,NOMBRE_1,NOMBRE_2,APELLIDO_1,APELLIDO_2,TIPO_DOC,DOCUMENTO,CELULAR,DIRECCION,CORREO,ESTADO,CREADO_EL,ID_TIENDA) values ('6','BRAYAN',null,'DEVIA','MACHADO','CC','1110556333','3115071561','CALLE X','BDEVIA95@GMAIL.COM','ACTIVO',to_date('03/03/21','DD/MM/RR'),'1');
Insert into SYSTEM.CLIENTES (ID_CLIENTE,NOMBRE_1,NOMBRE_2,APELLIDO_1,APELLIDO_2,TIPO_DOC,DOCUMENTO,CELULAR,DIRECCION,CORREO,ESTADO,CREADO_EL,ID_TIENDA) values ('22','MARIA','ALEJANDRA','LOZANO','DUCUARA','CC','1110592397','3017037313','CALLE X','MARIA@GMAIL.COM','ACTIVO',to_date('02/03/21','DD/MM/RR'),'1');
Insert into SYSTEM.CLIENTES (ID_CLIENTE,NOMBRE_1,NOMBRE_2,APELLIDO_1,APELLIDO_2,TIPO_DOC,DOCUMENTO,CELULAR,DIRECCION,CORREO,ESTADO,CREADO_EL,ID_TIENDA) values ('81','ssadsad',null,'asdasd',null,'TI','12344122','8851355','CALLE F','correo@correo.com','ACTIVO',to_date('04/03/21','DD/MM/RR'),'2');
Insert into SYSTEM.CLIENTES (ID_CLIENTE,NOMBRE_1,NOMBRE_2,APELLIDO_1,APELLIDO_2,TIPO_DOC,DOCUMENTO,CELULAR,DIRECCION,CORREO,ESTADO,CREADO_EL,ID_TIENDA) values ('42','BRANDON','STEVEN','DEVIA',null,'CC','1651684164','3115246855','CALLE XD','test2@test.com','ACTIVO',to_date('03/03/21','DD/MM/RR'),'2');
Insert into SYSTEM.CLIENTES (ID_CLIENTE,NOMBRE_1,NOMBRE_2,APELLIDO_1,APELLIDO_2,TIPO_DOC,DOCUMENTO,CELULAR,DIRECCION,CORREO,ESTADO,CREADO_EL,ID_TIENDA) values ('62','demo',null,'demoApe',null,'CC','13684155','13546832','Calle X','correo@test.com','ACTIVO',to_date('04/03/21','DD/MM/RR'),'2');
--------------------------------------------------------
--  DDL for Index CLIENTES_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."CLIENTES_PK" ON "SYSTEM"."CLIENTES" ("ID_CLIENTE") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index CLIENTES_DOC
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."CLIENTES_DOC" ON "SYSTEM"."CLIENTES" ("DOCUMENTO") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table CLIENTES
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("ID_CLIENTE" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("NOMBRE_1" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("APELLIDO_1" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("TIPO_DOC" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("DOCUMENTO" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("CELULAR" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("DIRECCION" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("CORREO" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("ESTADO" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("CREADO_EL" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" MODIFY ("ID_TIENDA" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."CLIENTES" ADD CONSTRAINT "CLIENTES_PK" PRIMARY KEY ("ID_CLIENTE")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table CLIENTES
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."CLIENTES" ADD CONSTRAINT "CLIENTES_FK1" FOREIGN KEY ("ID_TIENDA")
	  REFERENCES "SYSTEM"."TIENDAS" ("ID_TIENDA") ENABLE;
