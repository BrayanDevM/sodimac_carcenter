--------------------------------------------------------
-- Archivo creado  - jueves-marzo-04-2021   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table FACTURAS
--------------------------------------------------------

  CREATE TABLE "SYSTEM"."FACTURAS" 
   (	"ID_FACTURA" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"ID_VEHICULO" NUMBER, 
	"ID_EMPLEADO" NUMBER, 
	"MANTENIMIENTO_1" NUMBER, 
	"MANTENIMIENTO_2" NUMBER, 
	"MANTENIMIENTO_3" NUMBER, 
	"MANTENIMIENTO_4" NUMBER, 
	"MANTENIMIENTO_5" NUMBER, 
	"MANTENIMIENTO_6" NUMBER, 
	"MANTENIMIENTO_7" NUMBER, 
	"MANTENIMIENTO_8" NUMBER, 
	"MANTENIMIENTO_9" NUMBER, 
	"REPUESTO_1" NUMBER, 
	"REPUESTO_2" NUMBER, 
	"REPUESTO_3" NUMBER, 
	"REPUESTO_4" NUMBER, 
	"REPUESTO_5" NUMBER, 
	"REPUESTO_6" NUMBER, 
	"REPUESTO_7" NUMBER, 
	"REPUESTO_8" NUMBER, 
	"REPUESTO_9" NUMBER, 
	"TOTAL" NUMBER, 
	"UTILIDAD" NUMBER, 
	"FECHA" DATE, 
	"ID_TIENDA" NUMBER, 
	"ID_SOLICITUD" NUMBER
   ) PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
REM INSERTING into SYSTEM.FACTURAS
SET DEFINE OFF;
Insert into SYSTEM.FACTURAS (ID_FACTURA,ID_VEHICULO,ID_EMPLEADO,MANTENIMIENTO_1,MANTENIMIENTO_2,MANTENIMIENTO_3,MANTENIMIENTO_4,MANTENIMIENTO_5,MANTENIMIENTO_6,MANTENIMIENTO_7,MANTENIMIENTO_8,MANTENIMIENTO_9,REPUESTO_1,REPUESTO_2,REPUESTO_3,REPUESTO_4,REPUESTO_5,REPUESTO_6,REPUESTO_7,REPUESTO_8,REPUESTO_9,TOTAL,UTILIDAD,FECHA,ID_TIENDA,ID_SOLICITUD) values ('27','43','21','41',null,null,null,null,null,null,null,null,'1','22',null,null,null,null,null,null,null,'3587500','0',to_date('04/03/21','DD/MM/RR'),'1','1');
--------------------------------------------------------
--  DDL for Index FACTURAS_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "SYSTEM"."FACTURAS_PK" ON "SYSTEM"."FACTURAS" ("ID_FACTURA") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table FACTURAS
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("ID_FACTURA" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("ID_VEHICULO" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("ID_EMPLEADO" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("MANTENIMIENTO_1" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("REPUESTO_1" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("TOTAL" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("UTILIDAD" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("FECHA" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("ID_TIENDA" NOT NULL ENABLE);
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_PK" PRIMARY KEY ("ID_FACTURA")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" MODIFY ("ID_SOLICITUD" NOT NULL ENABLE);
--------------------------------------------------------
--  Ref Constraints for Table FACTURAS
--------------------------------------------------------

  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK1" FOREIGN KEY ("ID_TIENDA")
	  REFERENCES "SYSTEM"."TIENDAS" ("ID_TIENDA") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK2" FOREIGN KEY ("ID_VEHICULO")
	  REFERENCES "SYSTEM"."VEHICULOS" ("ID_VEHICULO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK3" FOREIGN KEY ("ID_EMPLEADO")
	  REFERENCES "SYSTEM"."EMPLEADOS" ("ID_EMPLEADO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK10" FOREIGN KEY ("MANTENIMIENTO_7")
	  REFERENCES "SYSTEM"."MANTENIMIENTOS" ("ID_MANTENIMIENTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK11" FOREIGN KEY ("MANTENIMIENTO_8")
	  REFERENCES "SYSTEM"."MANTENIMIENTOS" ("ID_MANTENIMIENTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK12" FOREIGN KEY ("MANTENIMIENTO_9")
	  REFERENCES "SYSTEM"."MANTENIMIENTOS" ("ID_MANTENIMIENTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK13" FOREIGN KEY ("REPUESTO_1")
	  REFERENCES "SYSTEM"."REPUESTOS" ("ID_REPUESTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK14" FOREIGN KEY ("REPUESTO_2")
	  REFERENCES "SYSTEM"."REPUESTOS" ("ID_REPUESTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK15" FOREIGN KEY ("REPUESTO_3")
	  REFERENCES "SYSTEM"."REPUESTOS" ("ID_REPUESTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK16" FOREIGN KEY ("REPUESTO_4")
	  REFERENCES "SYSTEM"."REPUESTOS" ("ID_REPUESTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK17" FOREIGN KEY ("REPUESTO_5")
	  REFERENCES "SYSTEM"."REPUESTOS" ("ID_REPUESTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK18" FOREIGN KEY ("REPUESTO_6")
	  REFERENCES "SYSTEM"."REPUESTOS" ("ID_REPUESTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK19" FOREIGN KEY ("REPUESTO_7")
	  REFERENCES "SYSTEM"."REPUESTOS" ("ID_REPUESTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK20" FOREIGN KEY ("REPUESTO_8")
	  REFERENCES "SYSTEM"."REPUESTOS" ("ID_REPUESTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK21" FOREIGN KEY ("REPUESTO_9")
	  REFERENCES "SYSTEM"."REPUESTOS" ("ID_REPUESTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK4" FOREIGN KEY ("MANTENIMIENTO_1")
	  REFERENCES "SYSTEM"."MANTENIMIENTOS" ("ID_MANTENIMIENTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK5" FOREIGN KEY ("MANTENIMIENTO_2")
	  REFERENCES "SYSTEM"."MANTENIMIENTOS" ("ID_MANTENIMIENTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK6" FOREIGN KEY ("MANTENIMIENTO_3")
	  REFERENCES "SYSTEM"."MANTENIMIENTOS" ("ID_MANTENIMIENTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK7" FOREIGN KEY ("MANTENIMIENTO_4")
	  REFERENCES "SYSTEM"."MANTENIMIENTOS" ("ID_MANTENIMIENTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK8" FOREIGN KEY ("MANTENIMIENTO_5")
	  REFERENCES "SYSTEM"."MANTENIMIENTOS" ("ID_MANTENIMIENTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK9" FOREIGN KEY ("MANTENIMIENTO_6")
	  REFERENCES "SYSTEM"."MANTENIMIENTOS" ("ID_MANTENIMIENTO") ENABLE;
  ALTER TABLE "SYSTEM"."FACTURAS" ADD CONSTRAINT "FACTURAS_FK22" FOREIGN KEY ("ID_SOLICITUD")
	  REFERENCES "SYSTEM"."SOLICITUDES" ("ID_SOLICITUD") ENABLE;
