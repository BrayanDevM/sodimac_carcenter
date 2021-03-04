--------------------------------------------------------
-- Archivo creado  - jueves-marzo-04-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table EMPLEADOS
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."EMPLEADOS" 
   (	"ID_EMPLEADO" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
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
REM INSERTING into SYSTEM.EMPLEADOS
SET DEFINE OFF;
Insert into SYSTEM.EMPLEADOS (ID_EMPLEADO,NOMBRE_1,NOMBRE_2,APELLIDO_1,APELLIDO_2,TIPO_DOC,DOCUMENTO,CELULAR,DIRECCION,CORREO,ESTADO,CREADO_EL,ID_TIENDA) values ('1','BRANDON','STEVEN','DEVIA',null,'CC','1651684164','3115246855','CALLE XD','test2@test.com','ACTIVO',to_date('03/03/21','DD/MM/RR'),'2');
Insert into SYSTEM.EMPLEADOS (ID_EMPLEADO,NOMBRE_1,NOMBRE_2,APELLIDO_1,APELLIDO_2,TIPO_DOC,DOCUMENTO,CELULAR,DIRECCION,CORREO,ESTADO,CREADO_EL,ID_TIENDA) values ('21','JUAN','CAMILO','ENCISO','PATI�O','CC','15658255','3115246855','CALLE PRUEBA Z','test3@test.com','ACTIVO',to_date('04/03/21','DD/MM/RR'),'2');
--------------------------------------------------------
--  DDL for Index EMPLEADOS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."EMPLEADOS_PK" ON "SYSTEM"."EMPLEADOS" ("ID_EMPLEADO") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index EMPLEADOS_DOC
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."EMPLEADOS_DOC" ON "SYSTEM"."EMPLEADOS" ("DOCUMENTO") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table EMPLEADOS
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("ID_EMPLEADO" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("NOMBRE_1" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("APELLIDO_1" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("TIPO_DOC" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("DOCUMENTO" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("CELULAR" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("DIRECCION" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("CORREO" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("ESTADO" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("CREADO_EL" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" MODIFY ("ID_TIENDA" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."EMPLEADOS" ADD CONSTRAINT "EMPLEADOS_PK" PRIMARY KEY ("ID_EMPLEADO")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table EMPLEADOS
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."EMPLEADOS" ADD CONSTRAINT "EMPLEADOS_FK1" FOREIGN KEY ("ID_TIENDA")
	  REFERENCES "SYSTEM"."TIENDAS" ("ID_TIENDA") ENABLE;
