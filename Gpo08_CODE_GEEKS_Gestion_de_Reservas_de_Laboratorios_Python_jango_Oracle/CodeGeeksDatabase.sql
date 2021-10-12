/*==============================================================*/
/* DBMS name:      ORACLE Version 11g                           */
/* Created on:     05/10/2021 3:02:22 pm                        */
/*==============================================================*/


alter table ADMINISTRADOR
   drop constraint FK_ADMINIST_TRABAJA_ESCUELA;

alter table CATEDRA
   drop constraint FK_CATEDRA_ENSENA_MATERIA;

alter table CICLO
   drop constraint FK_CICLO_CONTIENE_PENSUM;

alter table DOCENTE
   drop constraint FK_DOCENTE_TRABAJA2_ESCUELA;

alter table EDIFICIO
   drop constraint FK_EDIFICIO_ASOCIADA_ESCUELA;

alter table ES_PARTE_DE
   drop constraint FK_ES_PARTE_ES_PARTE__DOCENTE;

alter table ES_PARTE_DE
   drop constraint FK_ES_PARTE_ES_PARTE__CATEDRA;

alter table HORARIO
   drop constraint FK_HORARIO_PERTENECE_DIA;

alter table HORARIO
   drop constraint FK_HORARIO_SE_UTILIZ_HORA;

alter table IMAGEN
   drop constraint FK_IMAGEN_POSEE_LOCAL;

alter table IMPARTE
   drop constraint FK_IMPARTE_IMPARTE_CICLO;

alter table IMPARTE
   drop constraint FK_IMPARTE_IMPARTE2_MATERIA;

alter table LOCAL
   drop constraint FK_LOCAL_TIENE_EDIFICIO;

alter table NOTIFICACION
   drop constraint FK_NOTIFICA_RECIBE_ADMINIST;

alter table NOTIFICACION
   drop constraint FK_NOTIFICA_RECIBE2_DOCENTE;

alter table NOTIFICACION
   drop constraint FK_NOTIFICA_RELATIONS_RESERVA;

alter table PENSUM
   drop constraint FK_PENSUM_GENERA_ESCUELA;

alter table PUNTUACION
   drop constraint FK_PUNTUACI_CALIFICA_DOCENTE;

alter table PUNTUACION
   drop constraint FK_PUNTUACI_DESCRIBE_LOCAL;

alter table REQUISITO_DE
   drop constraint FK_REQUISIT_ES_REQUIS_MATERIA;

alter table REQUISITO_DE
   drop constraint FK_REQUISIT_TIENE_DE__MATERIA;

alter table RESERVA
   drop constraint FK_RESERVA_AUTORIZA_ADMINIST;

alter table RESERVA
   drop constraint FK_RESERVA_NECESITA_MATERIA;

alter table RESERVA
   drop constraint FK_RESERVA_REALIZA_DOCENTE;

alter table RESERVA
   drop constraint FK_RESERVA_SE_USA_DU_HORARIO;

alter table RESERVA
   drop constraint FK_RESERVA_UTILIZA_LOCAL;

drop index TRABAJA_FK;

drop table ADMINISTRADOR cascade constraints;

drop table CATEDRA cascade constraints;

drop table CICLO cascade constraints;

drop table DIA cascade constraints;

drop index TRABAJA2_FK;

drop table DOCENTE cascade constraints;

drop table EDIFICIO cascade constraints;

drop table ESCUELA cascade constraints;

drop table ES_PARTE_DE cascade constraints;

drop table HORA cascade constraints;

drop table HORARIO cascade constraints;

drop table IMAGEN cascade constraints;

drop table IMPARTE cascade constraints;

drop table LOCAL cascade constraints;

drop table MATERIA cascade constraints;

drop index RECIBE2_FK;

drop table NOTIFICACION cascade constraints;

drop index OFERTA_FK;

drop table PENSUM cascade constraints;

drop index RELATIONSHIP_21_FK;

drop index RELATIONSHIP_22_FK;

drop table PUNTUACION cascade constraints;

drop table REQUISITO_DE cascade constraints;

drop index SE_USA_DURANTE_FK;

drop table RESERVA cascade constraints;

/*==============================================================*/
/* Table: ADMINISTRADOR                                         */
/*==============================================================*/
create table ADMINISTRADOR 
(
   DUI                  INTEGER              not null,
   EMP_DUI              INTEGER              not null,
   COD_ESCUELA          VARCHAR2(10)         not null,
   NIT                  INTEGER,
   EMAIL                VARCHAR2(50),
   PASSWORD             VARCHAR2(256),
   NOMBRE               VARCHAR2(100),
   APELLIDOS            VARCHAR2(100),
   CODIGO_ADMINISTRADOR VARCHAR2(20)         not null,
   constraint PK_ADMINISTRADOR primary key (DUI, EMP_DUI)
);

/*==============================================================*/
/* Index: TRABAJA_FK                                            */
/*==============================================================*/
create index TRABAJA_FK on ADMINISTRADOR (
   COD_ESCUELA ASC
);

/*==============================================================*/
/* Table: CATEDRA                                               */
/*==============================================================*/
create table CATEDRA 
(
   COD_CATEDRA          INTEGER              not null,
   COD_MATERIA          VARCHAR2(6)          not null,
   ANIO                 INTEGER,
   CICLO_PAR            SMALLINT,
   FECHA_INICIO         DATE                 not null,
   FECHA_FIN            DATE                 not null,
   constraint PK_CATEDRA primary key (COD_CATEDRA)
);

/*==============================================================*/
/* Table: CICLO                                                 */
/*==============================================================*/
create table CICLO 
(
   ANIO_EN__PENSUM      INTEGER              not null,
   NUMERO_DE_CICLO      INTEGER              not null,
   COD_PENSUM           VARCHAR2(10)         not null,
   constraint PK_CICLO primary key (COD_PENSUM)
);

/*==============================================================*/
/* Table: DIA                                                   */
/*==============================================================*/
create table DIA 
(
   COD_DIA              INTEGER              not null,
   NOMBRE_DIA           VARCHAR2(15)         not null,
   constraint PK_DIA primary key (COD_DIA)
);

/*==============================================================*/
/* Table: DOCENTE                                               */
/*==============================================================*/
create table DOCENTE 
(
   DUI                  INTEGER              not null,
   COD_ESCUELA          VARCHAR2(10)         not null,
   NIT                  INTEGER,
   EMAIL                VARCHAR2(50),
   PASSWORD             VARCHAR2(256),
   NOMBRE               VARCHAR2(100),
   APELLIDOS            VARCHAR2(100),
   EMP_DUI              INTEGER              not null,
   ESTADO               VARCHAR2(20)         not null,
   CODIGO_DOCENTE       VARCHAR2(20)         not null,
   constraint PK_DOCENTE primary key (DUI, EMP_DUI)
);

/*==============================================================*/
/* Index: TRABAJA2_FK                                           */
/*==============================================================*/
create index TRABAJA2_FK on DOCENTE (
   COD_ESCUELA ASC
);

/*==============================================================*/
/* Table: EDIFICIO                                              */
/*==============================================================*/
create table EDIFICIO 
(
   COD_EDIFICIO         VARCHAR2(10)         not null,
   COD_ESCUELA          VARCHAR2(10)         not null,
   NOMBRE_EDIFICIO      VARCHAR2(50)         not null,
   LONGITUD             FLOAT,
   LATITUD              FLOAT,
   constraint PK_EDIFICIO primary key (COD_EDIFICIO)
);

/*==============================================================*/
/* Table: ESCUELA                                               */
/*==============================================================*/
create table ESCUELA 
(
   COD_ESCUELA          VARCHAR2(10)         not null,
   NOMBRE_ESCUELA       VARCHAR2(20)         not null,
   constraint PK_ESCUELA primary key (COD_ESCUELA)
);

/*==============================================================*/
/* Table: ES_PARTE_DE                                           */
/*==============================================================*/
create table ES_PARTE_DE 
(
   DUI                  INTEGER              not null,
   EMP_DUI              INTEGER              not null,
   COD_CATEDRA          INTEGER              not null,
   COORDINADOR          SMALLINT,
   constraint PK_ES_PARTE_DE primary key (DUI, EMP_DUI, COD_CATEDRA)
);

/*==============================================================*/
/* Table: HORA                                                  */
/*==============================================================*/
create table HORA 
(
   COD_HORA             INTEGER              not null,
   HORA_INICIO          DATE                 not null,
   HORA_FIN             DATE                 not null,
   constraint PK_HORA primary key (COD_HORA)
);

/*==============================================================*/
/* Table: HORARIO                                               */
/*==============================================================*/
create table HORARIO 
(
   COD_HORA             INTEGER              not null,
   COD_DIA              INTEGER              not null,
   COD_HORARIO          INTEGER              not null,
   constraint PK_HORARIO primary key (COD_HORARIO)
);

/*==============================================================*/
/* Table: IMAGEN                                                */
/*==============================================================*/
create table IMAGEN 
(
   COD_IMAGEN           VARCHAR2(10)         not null,
   COD_LOCAL            VARCHAR2(10)         not null,
   constraint PK_IMAGEN primary key (COD_IMAGEN)
);

/*==============================================================*/
/* Table: IMPARTE                                               */
/*==============================================================*/
create table IMPARTE 
(
   NUMERO_DE_CICLO      INTEGER              not null,
   COD_MATERIA          VARCHAR2(6)          not null,
   COD_PENSUM           VARCHAR2(10)         not null,
   CICLO_PAR            SMALLINT,
   constraint PK_IMPARTE primary key (NUMERO_DE_CICLO, COD_MATERIA)
);

/*==============================================================*/
/* Table: LOCAL                                                 */
/*==============================================================*/
create table LOCAL 
(
   COD_LOCAL            VARCHAR2(10)         not null,
   COD_EDIFICIO         VARCHAR2(10)         not null,
   NOMBRE_LOCAL         VARCHAR2(50)         not null,
   DESCRIPCION          VARCHAR2(50)         not null,
   NIVEL                INTEGER              not null,
   ALTITUD              FLOAT,
   constraint PK_LOCAL primary key (COD_LOCAL)
);

/*==============================================================*/
/* Table: MATERIA                                               */
/*==============================================================*/
create table MATERIA 
(
   COD_MATERIA          VARCHAR2(6)          not null,
   NOMBRE_MATERIA       VARCHAR2(50)         not null,
   UNIDADES_VALORATIVAS INTEGER,
   OBLIGATORIA          SMALLINT,
   constraint PK_MATERIA primary key (COD_MATERIA)
);

/*==============================================================*/
/* Table: NOTIFICACION                                          */
/*==============================================================*/
create table NOTIFICACION 
(
   COD_NOTIFICACION     INTEGER              not null,
   DUI                  INTEGER,
   COD_RESERVA          INTEGER,
   VISTO                SMALLINT,
   FECHA                DATE,
   HORA                 DATE,
   TITULO               VARCHAR2(256),
   constraint PK_NOTIFICACION primary key (COD_NOTIFICACION)
);

/*==============================================================*/
/* Index: RECIBE2_FK                                            */
/*==============================================================*/
create index RECIBE2_FK on NOTIFICACION (
   DUI ASC
);

/*==============================================================*/
/* Table: PENSUM                                                */
/*==============================================================*/
create table PENSUM 
(
   COD_PENSUM           VARCHAR2(10)         not null,
   COD_ESCUELA          VARCHAR2(10),
   ANIO_PUBLICACION     DATE                 not null,
   CARRERA              VARCHAR2(100),
   constraint PK_PENSUM primary key (COD_PENSUM)
);

/*==============================================================*/
/* Index: OFERTA_FK                                             */
/*==============================================================*/
create index OFERTA_FK on PENSUM (
   COD_ESCUELA ASC
);

/*==============================================================*/
/* Table: PUNTUACION                                            */
/*==============================================================*/
create table PUNTUACION 
(
   DUI                  INTEGER              not null,
   COD_LOCAL            VARCHAR2(10)         not null,
   EMP_DUI              INTEGER              not null,
   constraint PK_PUNTUACION primary key (DUI, COD_LOCAL)
);

/*==============================================================*/
/* Index: RELATIONSHIP_22_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_22_FK on PUNTUACION (
   DUI ASC,
   EMP_DUI ASC
);

/*==============================================================*/
/* Index: RELATIONSHIP_21_FK                                    */
/*==============================================================*/
create index RELATIONSHIP_21_FK on PUNTUACION (
   COD_LOCAL ASC
);

/*==============================================================*/
/* Table: REQUISITO_DE                                          */
/*==============================================================*/
create table REQUISITO_DE 
(
   MAT_COD_MATERIA      VARCHAR2(6)          not null,
   COD_MATERIA          VARCHAR2(6)          not null,
   constraint PK_REQUISITO_DE primary key (MAT_COD_MATERIA, COD_MATERIA)
);

/*==============================================================*/
/* Table: RESERVA                                               */
/*==============================================================*/
create table RESERVA 
(
   COD_RESERVA          INTEGER              not null,
   COD_HORARIO          INTEGER              not null,
   COD_LOCAL            VARCHAR2(10),
   COD_MATERIA          VARCHAR2(6),
   DUI                  INTEGER              not null,
   EMP_DUI              INTEGER              not null,
   ADM_DUI              INTEGER              not null,
   ADM_EMP_DUI          INTEGER              not null,
   ESTADO_SOLICITUD     VARCHAR2(20)         not null,
   FECHA_ENVIO          DATE                 not null,
   FECHA_APROBACION     DATE                 not null,
   constraint PK_RESERVA primary key (COD_RESERVA)
);

/*==============================================================*/
/* Index: SE_USA_DURANTE_FK                                     */
/*==============================================================*/
create index SE_USA_DURANTE_FK on RESERVA (
   
);

alter table ADMINISTRADOR
   add constraint FK_ADMINIST_TRABAJA_ESCUELA foreign key (COD_ESCUELA)
      references ESCUELA (COD_ESCUELA);

alter table CATEDRA
   add constraint FK_CATEDRA_ENSENA_MATERIA foreign key (COD_MATERIA)
      references MATERIA (COD_MATERIA);

alter table CICLO
   add constraint FK_CICLO_CONTIENE_PENSUM foreign key (COD_PENSUM)
      references PENSUM (COD_PENSUM);

alter table DOCENTE
   add constraint FK_DOCENTE_TRABAJA2_ESCUELA foreign key (COD_ESCUELA)
      references ESCUELA (COD_ESCUELA);

alter table EDIFICIO
   add constraint FK_EDIFICIO_ASOCIADA_ESCUELA foreign key (COD_ESCUELA)
      references ESCUELA (COD_ESCUELA);

alter table ES_PARTE_DE
   add constraint FK_ES_PARTE_ES_PARTE__DOCENTE foreign key (DUI, EMP_DUI)
      references DOCENTE (DUI, EMP_DUI);

alter table ES_PARTE_DE
   add constraint FK_ES_PARTE_ES_PARTE__CATEDRA foreign key (COD_CATEDRA)
      references CATEDRA (COD_CATEDRA);

alter table HORARIO
   add constraint FK_HORARIO_PERTENECE_DIA foreign key (COD_DIA)
      references DIA (COD_DIA);

alter table HORARIO
   add constraint FK_HORARIO_SE_UTILIZ_HORA foreign key (COD_HORA)
      references HORA (COD_HORA);

alter table IMAGEN
   add constraint FK_IMAGEN_POSEE_LOCAL foreign key (COD_LOCAL)
      references LOCAL (COD_LOCAL);

alter table IMPARTE
   add constraint FK_IMPARTE_IMPARTE_CICLO foreign key ()
      references CICLO;

alter table IMPARTE
   add constraint FK_IMPARTE_IMPARTE2_MATERIA foreign key (COD_MATERIA)
      references MATERIA (COD_MATERIA);

alter table LOCAL
   add constraint FK_LOCAL_TIENE_EDIFICIO foreign key (COD_EDIFICIO)
      references EDIFICIO (COD_EDIFICIO);

alter table NOTIFICACION
   add constraint FK_NOTIFICA_RECIBE_ADMINIST foreign key (DUI)
      references ADMINISTRADOR (EMP_DUI);

alter table NOTIFICACION
   add constraint FK_NOTIFICA_RECIBE2_DOCENTE foreign key (DUI)
      references DOCENTE (EMP_DUI);

alter table NOTIFICACION
   add constraint FK_NOTIFICA_RELATIONS_RESERVA foreign key (COD_RESERVA)
      references RESERVA (COD_RESERVA);

alter table PENSUM
   add constraint FK_PENSUM_GENERA_ESCUELA foreign key (COD_ESCUELA)
      references ESCUELA (COD_ESCUELA);

alter table PUNTUACION
   add constraint FK_PUNTUACI_CALIFICA_DOCENTE foreign key (DUI, EMP_DUI)
      references DOCENTE (DUI, EMP_DUI);

alter table PUNTUACION
   add constraint FK_PUNTUACI_DESCRIBE_LOCAL foreign key (COD_LOCAL)
      references LOCAL (COD_LOCAL);

alter table REQUISITO_DE
   add constraint FK_REQUISIT_ES_REQUIS_MATERIA foreign key (MAT_COD_MATERIA)
      references MATERIA (COD_MATERIA);

alter table REQUISITO_DE
   add constraint FK_REQUISIT_TIENE_DE__MATERIA foreign key (COD_MATERIA)
      references MATERIA (COD_MATERIA);

alter table RESERVA
   add constraint FK_RESERVA_AUTORIZA_ADMINIST foreign key (ADM_DUI, ADM_EMP_DUI)
      references ADMINISTRADOR (DUI, EMP_DUI);

alter table RESERVA
   add constraint FK_RESERVA_NECESITA_MATERIA foreign key (COD_MATERIA)
      references MATERIA (COD_MATERIA);

alter table RESERVA
   add constraint FK_RESERVA_REALIZA_DOCENTE foreign key (DUI, EMP_DUI)
      references DOCENTE (DUI, EMP_DUI);

alter table RESERVA
   add constraint FK_RESERVA_SE_USA_DU_HORARIO foreign key ()
      references HORARIO;

alter table RESERVA
   add constraint FK_RESERVA_UTILIZA_LOCAL foreign key (COD_LOCAL)
      references LOCAL (COD_LOCAL);

